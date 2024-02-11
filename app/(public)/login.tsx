import { useSignIn, isClerkAPIResponseError } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import { PhoneCodeFactor, SignInFirstFactor } from "@clerk/types";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [phoneError, setPhoneError] = React.useState("");
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
    setPhoneError('');
  };

  const [disableSendCode, setDisableSendCode] = useState(false);

  const handleCodeChange = () => {
    onSignInPress(); // Call your existing function
    setDisableSendCode(true); // Disable the button

    // Enable the button after 30 seconds
    setTimeout(() => {
      setDisableSendCode(false);
    }, 30000); // 30 seconds
  };

  useEffect(() => {
    let timeoutId;

    if (disableSendCode) {
      // Set up the timeout and store its ID
      timeoutId = setTimeout(() => {
        setDisableSendCode(false);
      }, 30000); // 30 seconds
    }

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [disableSendCode]);

  const backButton = () => {
    window.location.reload();    
    setVerifying(false); 
    setPhone('')
  }

  const onSignInPress = async () => {
    if (!isLoaded && !signIn) return null;

    setLoading(true);
    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: phone,
      });

      // Filter the returned array to find the 'phone_code' entry
      const isPhoneCodeFactor = (
        factor: SignInFirstFactor
      ): factor is PhoneCodeFactor => {
        return factor.strategy === "phone_code";
      };
      const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor);

      if (phoneCodeFactor) {
        // Grab the phoneNumberId
        const { phoneNumberId } = phoneCodeFactor;

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        // Set 'verifying' true to display second form and capture the OTP code
        setVerifying(true);
        setLoading(false);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
      setPhoneError("Couldn't find that number!");
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded && !signIn) return null;
    setLoading(true);

    try {
      // Use the code provided by the user and attempt verification
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });

      // This mainly for debuggin while developing.
      // Once your Instance is setup this should not be required.
      if (completeSignIn.status !== "complete") {
        console.error(JSON.stringify(completeSignIn, null, 2));
        setCodeError("An error occurred");
        setLoading(false);
      }

      // If verification was completed, create a session for the user
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
      }
    } catch (err: unknown) {
      // See https://clerk.com/docs/custom-flows/error-handling for more on error handling
      setLoading(false);
      if (isClerkAPIResponseError(err)) {
        const error = err.errors[0];
        if (error.code === "verification_failed") {
          setCodeError("Verification failed");
        } else if (error.code === "form_code_incorrect") {
          setCodeError("Incorrect code");
        } else {
          setCodeError("Verification error");
        }
      } else {
        setCodeError("An error occurred");
      }
    }
  }

  if (verifying) {
    return (
        <Box style={styles.container}>
          <Spinner visible={loading} />
            <Box>
                <Text >Let's make sure this is you.</Text>
                <Text >
                    Enter your six-digit verification code.
                </Text>
                <TextInput
                    id="code"
                    keyboardType="numeric"
                    autoComplete='one-time-code'
                    placeholder="Enter Code"
                    value={code}
                    onChangeText={handleCodeChange}
                    style={styles.inputField}
                />
                {codeError ? <Text style={styles.errorText}>{codeError}</Text> : null}
                <Button
                    onPress={handleVerification} 
                    title="Confirm"
                    color="#6c47ff"
                    disabled={loading}
                />
                <Button
                    onPress={onSignInPress} 
                    title="Send Another Code"
                    color="#6c47ff" 
                    disabled={loading || disableSendCode} 
                />
                <Button
                    onPress={backButton}
                    title="Back"
                    color='#ff0000'
                    disabled={loading}
                />
            </Box>
        </Box>
    );
}

  return (
    <Box style={styles.container}>
      <Spinner visible={loading} />

      <TextInput textContentType='telephoneNumber' autoCapitalize="none" keyboardType="numeric" placeholder="Enter phone number" placeholderTextColor={'#000'} value={phone} onChangeText={handlePhoneChange} style={styles.inputField} />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      <Button onPress={onSignInPress} title="Login" color={'#6c47ff'}></Button>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff0000',
  }
});

export default Login;
