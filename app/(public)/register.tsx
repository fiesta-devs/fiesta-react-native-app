import { TextInput, View, StyleSheet, Alert, Pressable } from "react-native";
import { useSignUp, isClerkAPIResponseError, useSession } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { createUser, uploadProfilePic } from '../../hooks/endpoints';

import {
  ArrowLeftIcon,
  Box,
  Text,
  Icon,
  Image,
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

interface Profile {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface ImageResult {
  assets: Array<{
    uri: string;
  }>;
  canceled: boolean;
}

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { session } = useSession();
  const [settingUp, setSettingUp] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSendCode, setDisableSendCode] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({ firstName: '', lastName: '', profilePicture: '' });

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
  const handleVerification = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code,
      });
      setVerifying(false);
      if (completeSignUp.status !== "complete") {
        throw new Error("internal server error");
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setSettingUp(true);
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        const error = err.errors[0];
        if (error.code === "verification_failed") {
          setCodeError("Verification failed");
        } else if (error.code === "form_code_incorrect") {
          setCodeError("Incorrect code");
        } else if (code === "") {
          setCodeError("Please enter a valid code");
        } else {
          setCodeError("Verification error");
        }
      } else {
        setCodeError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  //called when click complete sign up
  const completeSignUp = async () => {
    try {
      // Get the token from the active session
      const token = await session.getToken();
      console.log("token: ", token)

      // Create user in your backend
      const userData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        // Add other necessary fields
      };
      await createUser(userData, token);

      // Upload profile picture if it exists
      if (profile.profilePicture) {
        const fileUri = profile.profilePicture;
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append('profilePicture', blob);

        await uploadProfilePic(profile.profilePicture, token);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result: ImageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfile({ ...profile, profilePicture: result.assets[0].uri });
    }
  };

  const handlePhoneChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const newPhone = e.nativeEvent.text;
    setPhone(newPhone);
    setPhoneError("");
  };

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

  const backButton = () => {
    setVerifying(false);
    setPhone("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !verifying }} />
      <Spinner visible={loading} />

      {!verifying && !settingUp && (
        <>
          <Text size="4xl" color="$white" fontWeight="$semibold" marginBottom={"$4"}>
            Register
          </Text>
          <Input
            w={"$full"}
            variant="outline"
            borderColor="black"
            h={"$16"}
            rounded={"$full"}
            size="xl"
            bg="$light800"
            marginBottom={"$4"}
          >
            <InputField
              size="xl"
              ml={"$2"}
              placeholderTextColor={"$light400"}
              placeholder="Enter phone number..."
              keyboardType="numeric"
              textContentType="telephoneNumber"
              onChange={handlePhoneChange}
              value={phone}
              color="white"
            />
          </Input>
          {phoneError ? <Text color="$rose600">{phoneError}</Text> : null}
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
          <Spinner visible={loading} />
          <Box mt={"$24"} alignItems="baseline">
            <Button onPress={backButton} variant="link" p={0}>
              <Icon as={ArrowLeftIcon} size="xl" color="white" />
            </Button>
          </Box>
          <Box mt={"$6"} mb={"$20"}>
            <Text size="4xl" fontWeight="$semibold" color="$white">
              Let's make sure this is you.
            </Text>
          </Box>
          <Text fontSize={"$xl"} color="$light500">
            Enter your six-digit verification code.
          </Text>
          <Box gap={"$4"}>
            <Input
              w={"$full"}
              variant="outline"
              borderColor="black"
              h={"$16"}
              rounded={"$full"}
              size="xl"
              bg="$light800"
              mt={"$4"}
            >
              <InputField
                size="xl"
                ml={"$2"}
                placeholderTextColor={"$light400"}
                placeholder="Enter Code"
                keyboardType="numeric"
                textContentType="oneTimeCode"
                onChange={handleCodeChange}
                value={code}
                color="white"
              />
              <Box position="absolute" top={10} right={20}>
                <Button
                  onPress={onSignUpPress}
                  variant="link"
                  p={0}
                  disabled={disableSendCode || loading}
                >
                  <Icon
                    as={RepeatIcon}
                    size="xl"
                    color={!disableSendCode && !loading ? "white" : "grey"}
                  />
                </Button>
              </Box>
            </Input>
            {codeError ? <Text color="$rose600">{codeError}</Text> : null}
            <Button
              onPress={handleVerification}
              bg={"#6c47ff"}
              rounded={"$full"}
              size="xl"
              h={"$16"}
              disabled={loading}
            >
              <ButtonText>Confirm</ButtonText>
            </Button>
          </Box>
        </>
      )}
      {settingUp && (
        <>
          <Spinner visible={loading} />
          <View style={styles.imagePicker}>
            {profile.profilePicture ? (
              <>
                <Image alt='current_avatar' source={{ uri: profile.profilePicture }} style={styles.imagePreview} />
                <Button onPress={pickImage} bg={'#6c47ff'}>
                  <ButtonText>{profile.profilePicture ? 'Change' : 'Select'} Profile Picture</ButtonText>
                </Button>
              </>
            ) : (
              <Pressable onPress={pickImage}>
                <Image source={require('../../assets/default_avatar.png')} style={styles.imagePreview} alt='default profile pic' />
              </Pressable>
            )}
          </View>
          <TextInput
            value={profile.firstName}
            placeholder="First Name"
            style={styles.inputField}
            onChangeText={(text) => setProfile({ ...profile, firstName: text })}
          />
          <TextInput
            value={profile.lastName}
            placeholder="Last Name"
            style={styles.inputField}
            onChangeText={(text) => setProfile({ ...profile, lastName: text })}
          />
          <Button onPress={completeSignUp} bg={'#6c47ff'}>
            <ButtonText>Complete Sign Up</ButtonText>
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
    backgroundColor: "black",
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
  imagePicker: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default Register;
