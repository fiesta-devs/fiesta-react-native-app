import { TextInput, View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";

import {
  ArrowLeftIcon,
  Box,
  Text,
  Icon,
  Input,
  Button,
  ButtonText,
  SafeAreaView,
  InputField,
  RepeatIcon,
} from "@gluestack-ui/themed";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [phone, setPhone] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        phoneNumber: phone,
      });

      // Send verification code
      await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });

      // change the UI to verify the phone number
      setVerifying(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const newPhone = e.nativeEvent.text;
    setPhone(newPhone);
    setPhoneError("");
  };

  const [disableSendCode, setDisableSendCode] = useState(false);

  const handleCodeChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const newCode = e.nativeEvent.text;
    setCode(newCode);
    setCodeError("");
  };

  const resetSignUpState = () => {
    setVerifying(false);
    setPhone("");
    setCode("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !verifying }} />
      <Spinner visible={loading} />

      {!verifying && (
        <>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.inputField}
            textContentType="telephoneNumber"
          />
          <Button
            onPress={onSignUpPress}
            bg={"#FF025B"}
            rounded={"$full"}
            size="xl"
            h={"$16"}
          >
            <ButtonText>Register</ButtonText>
          </Button>
        </>
      )}

      {verifying && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Enter Code"
              style={styles.inputField}
              onChangeText={setCode}
              textContentType="oneTimeCode"
            />
          </View>
          <Button
            onPress={resetSignUpState}
          >
            <ButtonText>back</ButtonText>
          </Button>
          <Button
            onPress={onPressVerify}
            bg={"#6c47ff"}
          >
            <ButtonText>Verify</ButtonText>
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default Register;
