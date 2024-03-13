import React, { useEffect, useState } from "react";
import { Box, Text, Button, SafeAreaView } from "@gluestack-ui/themed";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import Scanner from "./Scanner";
import ScanDrawer from "./ScanDrawer";
import { useTabsContext } from "../context/TabsContext";
//import { Linking } from "react-native";

const ScanPage = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanValue, setScanValue] = useState<string | null>(null);
  const { liveEvents, userProfile } = useTabsContext(); // Destructure userProfile from useTabsContext

  const resetState = () => {
    setScanned(false);
    setScanValue(null);
  };

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

  // const openOrgDashboardInSafari = async () => {
  //   await Linking.openURL("https://thefiesta.app/organization/dashboard");
  // };

  return (
    <SafeAreaView bg="$white" sx={{ marginVertical: 20 }}>
      {/* {liveEvents.length === 0 ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text size="3xl" paddingBottom={20} fontWeight="$semibold">
            Ready to party?
          </Text>
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
      ) : ( */}
      <Box>
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
          <Box>
            {!scanned && (
              <Scanner
                hasPermission={hasPermission}
                scanned={scanned}
                onScan={handleScan}
              />
            )}
          </Box>
        )}
      </Box>
      {/* )} */}
      <ScanDrawer
        scanned={scanned}
        resetState={resetState}
        scanValue={scanValue}
        eventId={liveEvents[0]?.id}
      />
    </SafeAreaView>
  );
};

export default ScanPage;
