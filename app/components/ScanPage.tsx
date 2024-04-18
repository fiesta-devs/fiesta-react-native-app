import React, { useEffect, useState } from "react";
import { Box, Text, Button, SafeAreaView } from "@gluestack-ui/themed";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import Scanner from "./Scanner";
import ScanDrawer from "./ScanDrawer";
import { useTabsContext } from "../context/TabsContext";
import { useAuth } from "@clerk/clerk-expo";
import { postScan } from "../../hooks/endpoints";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  scans: Scan[];
}

interface Scan {
  id: number;
  accepted: boolean;
  eventId: number;
  inviteId: number;
  userId: number;
  createdById: number;
  createdAt: string;
  user: User;
}

const ScanPage = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scan, setScan] = useState<Scan>(null);
  const [error, setError] = useState<boolean>(false);
  const { getToken } = useAuth();
  const { userProfile } = useTabsContext(); // Destructure userProfile from useTabsContext

  const fetchData = async (userId: string) => {
    try {
      const token = await getToken();
      const scanData = await postScan(token, userId, userProfile?.org.liveEventId);
      console.log("fetchData: ", scanData);
      return scanData;
    } catch (error) {
      setError(true);
      return null;
    }
  };

  const resetState = () => {
    setScanned(false);
    setScan(null);
    setError(false);
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

  const handleScan: BarCodeScannedCallback = async (scanningResult) => {
    const data = await fetchData(scanningResult.data);
    setScanned(true);
    setScan(data);
  };

  // const openOrgDashboardInSafari = async () => {
  //   await Linking.openURL("https://thefiesta.app/organization/dashboard");
  // };

  return (
    <SafeAreaView>
      {!userProfile.org.liveEventId ? (
        <Box alignItems="center" justifyContent="center">
          <Text size="3xl" fontWeight="$semibold">
            No live events :(
          </Text>
          {/* <Button
            onPress={openOrgDashboardInSafari}
            bg="#FF025B"
            // size="lg"
            size="xl"
            rounded={"$full"}
          >
            <ButtonText>View events</ButtonText>
          </Button> */}
        </Box>
      ) : (
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
      )}
      <ScanDrawer
        scanned={scanned}
        scan={scan}
        resetState={resetState}
        error={error}
      />
    </SafeAreaView>
  );
};

export default ScanPage;
