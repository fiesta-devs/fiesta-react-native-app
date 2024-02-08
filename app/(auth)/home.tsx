import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import SignOutButton from '../components/SignOutButton'

const Home = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.phoneNumbers[0].phoneNumber} 🎉</Text>
      <SignOutButton />
    </View>
  );
};

export default Home;

/*import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import Scanner from "../components/Scanner";
import ScannedProfile from "../components/ScannedProfile";
import { NativeBaseProvider, Box, Text, Button, Center } from "native-base";
import ActionSheet from "../components/ActionSheet";

export default function Home(): JSX.Element {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("Not yet scanned");

  const askForCamPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCamPermission();
  }, []);

  const handleScan: BarCodeScannedCallback = (scanningResult) => {
    setScanned(true);
    setText(scanningResult.data);
    console.log(
      "Type: " + scanningResult.type + "\nData: " + scanningResult.data
    );
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} bg="white" alignItems="center" justifyContent="center">
          {hasPermission === null && (
            <Text fontSize="md">Requesting for camera permission</Text>
          )}
          {hasPermission === false && (
            <Box p={4}>
              <Text fontSize="md" my={2}>
                No access to camera
              </Text>
              <Button onPress={askForCamPermission}>Allow Camera</Button>
            </Box>
          )}
          {hasPermission && (
            <>
              <Scanner
                hasPermission={hasPermission}
                scanned={scanned}
                onScan={handleScan}
              />
              <Text fontSize="md" m={5}>
                {text}
              </Text>
              {scanned && (
                <Button onPress={() => setScanned(false)} colorScheme="danger">
                  Scan again?
                </Button>
              )}
            </>
          )}
        </Box>
        <ActionSheet scanned={scanned}/>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}*/
