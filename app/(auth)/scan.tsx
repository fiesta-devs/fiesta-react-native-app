import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView, Box, Text, Button } from "@gluestack-ui/themed";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import Scanner from "../components/Scanner";
import ScanDrawer from "../components/ScanDrawer";
import { getEvents, getUserProfile } from "../../hooks/endpoints";

const Scan = () => {
  const { getToken } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("Not yet scanned");
  const [events, setEvents] = useState([]);
  const [userProfile, setUserProfile] = useState(null);


  const askForCamPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCamPermission();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const userProfileData = await getUserProfile(token);
      //const eventsData = await getEvents(token);
      setUserProfile(userProfileData);
      //setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScan: BarCodeScannedCallback = (scanningResult) => {
    setScanned(true);
    setText(scanningResult.data);
    console.log(
      "Type: " + scanningResult.type + "\nData: " + scanningResult.data
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="white" alignItems="center" justifyContent="center">
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
          <>
            <Scanner
              hasPermission={hasPermission}
              scanned={scanned}
              onScan={handleScan}
            />
            <Text fontSize="$md" m={5}>
              {text}
            </Text>
            {scanned && (
              <Button onPress={() => setScanned(false)} bg="danger">
                <Text>Scan again?</Text>
              </Button>
            )}
          </>
        )}
      </Box>
      <ScanDrawer scanned={scanned} />
    </SafeAreaView>
  );
};

export default Scan;
