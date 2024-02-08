import { useSignIn, isClerkAPIResponseError } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
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
        <View style={styles.container}>
          <Spinner visible={loading} />
            {/* Assuming you have a form handling function similar to handleVerification */}
            <View>
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
                    onChangeText={setCode}
                    style={styles.inputField}
                />
                <Text style={styles.errorText}>{codeError}</Text>
                <Button
                    onPress={handleVerification} // Make sure this function handles the form submission logic appropriately
                    title="Confirm"
                    color="#6c47ff"
                    disabled={loading}
                />
            </View>
        </View>
    );
}

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput autoCapitalize="none" keyboardType="numeric" placeholder="Enter phone number" placeholderTextColor={'#000'} value={phone} onChangeText={setPhone} style={styles.inputField} />

      <Button onPress={onSignInPress} title="Login" color={'#6c47ff'}></Button>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
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
