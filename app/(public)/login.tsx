import { useSignIn, isClerkAPIResponseError } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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
import Spinner from "react-native-loading-spinner-overlay";
import { PhoneCodeFactor, SignInFirstFactor } from "@clerk/types";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [phoneError, setPhoneError] = React.useState("");
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

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
    setVerifying(false);
    setPhone("");
  };

  const onSignInPress = async () => {
    if (!isLoaded && !signIn) return null;
    setDisableSendCode(true);

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

  if (verifying) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView bg="$black" h={"$full"}>
          <Box w={"$full"} h={"$full"} px={"$4"}>
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
                    onPress={onSignInPress}
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
          </Box>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView bg="$black" h={"$full"}>
        <Box
          w={"$full"}
          h={"$full"}
          px={"$4"}
        // borderWidth={"$2"}
        // borderColor="$white"
        >
          <Box
            mt={"$32"}
            mb={"$20"}
            position="relative"
          // borderWidth={"$2"}
          // borderColor="$white"
          >
            <Text size="4xl" fontWeight="$semibold" color="$white">
              Welcome to the party.
            </Text>
            <Text fontSize={"$xl"} color="$light500">
              Login to Fiesta.
            </Text>
          </Box>
          <Box gap={"$4"}>
            <Text size="xl" color="$white" fontWeight="$semibold">
              Already have an account?
            </Text>
            <Input
              w={"$full"}
              variant="outline"
              borderColor="black"
              h={"$16"}
              rounded={"$full"}
              size="xl"
              bg="$light800"
            >
              <InputField
                size="xl"
                ml={"$2"}
                placeholderTextColor={"$light400"}
                placeholder="Phone number"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                onChange={handlePhoneChange}
                value={phone}
                color="white"
              />
            </Input>
            {phoneError ? <Text color="$rose600">{phoneError}</Text> : null}
            <Button
              onPress={onSignInPress}
              bg={"#FF025B"}
              rounded={"$full"}
              size="xl"
              h={"$16"}
            >
              <ButtonText>Login</ButtonText>
            </Button>
            <Text
              size="2xl"
              color="$light300"
              textAlign="center"
              my={"$8"}
              fontWeight="$semibold"
            >
              - or -
            </Text>
            <Link href="/register" asChild>
              <Button
                variant="outline"
                rounded={"$full"}
                borderColor="$light500"
                h={"$16"}
              >
                <ButtonText color="$light300">Create Account</ButtonText>
              </Button>
            </Link>
          </Box>
          {/* <Spinner visible={loading} /> */}
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
