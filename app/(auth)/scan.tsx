import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import {
  SafeAreaView,
  Box,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import Scanner from "../components/Scanner";
import ScanDrawer from "../components/ScanDrawer";
import { useTabsContext } from "../context/TabsContext";
import { Linking } from "react-native";

const Scan = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanValue, setScanValue] = useState<string | null>(null);
  const { liveEvents } = useTabsContext();

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
    setScanValue(scanningResult.data);
  };

  const openOrgDashboardInSafari = async () => {
    await Linking.openURL(
      "https://fiesta-preview.fly.dev/organization/dashboard"
    );
  };

  return (
    <SafeAreaView bg="$white" style={{ flex: 1 }}>
      {liveEvents.length === 0 ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text size="3xl" paddingBottom={20} fontWeight="$semibold">
            Ready to party?
          </Text>
          {/* <Text paddingBottom={20}>Go start a live event!</Text> */}
          <Button
            onPress={openOrgDashboardInSafari}
            bg="#FF025B"
            // size="lg"
            size="xl"
            rounded={"$full"}
          >
            <ButtonText>View events</ButtonText>
          </Button>
        </Box>
      ) : (
        <Box flex={1}>
          {hasPermission === null && (
            <Text fontSize="$md">Requesting for camera permission</Text>
          )}
          {hasPermission === false && (
            <Box p={4}>
              <Text fontSize="$md" my={2}>
                No access to camera
              </Text>
              <Button onPress={askForCamPermission}>Allow Camera</Button>
            </Box>
          )}
          {hasPermission && (
            <Box flex={1} gap={"$20"}>
              <Box padding={"$4"}>
                <Text color="black" size="4xl" fontWeight="$semibold">
                  Scanning for:
                </Text>
                <Text color="black" size="4xl" fontWeight="$semibold">
                  {liveEvents[0].name}
                </Text>
              </Box>

              <Scanner
                hasPermission={hasPermission}
                scanned={scanned}
                onScan={handleScan}
              />
              {/* <Text fontSize="$md" m={5}>
                  {text}
                </Text> */}
              {/* {scanned && (
                <Button onPress={() => setScanned(false)} bg="danger">
                  <Text>Scan again?</Text>
                </Button>
              )} */}
            </Box>
          )}
        </Box>
      )}
      <ScanDrawer
        scanned={scanned}
        setScanned={setScanned}
        scanValue={scanValue}
        eventId={liveEvents[0]?.id}
      />
    </SafeAreaView>
  );
};

export default Scan;
