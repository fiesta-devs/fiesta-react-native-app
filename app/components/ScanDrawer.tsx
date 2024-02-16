import React, { useEffect } from "react";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  Center,
  Button,
  Text,
} from "@gluestack-ui/themed";
import ScannedProfile from "./ScannedProfile";
import { postScan } from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";

export default function ScanDrawer({
  scanned,
  scanValue,
  eventId,
  setScanned,
}: {
  scanned: boolean;
  scanValue: string;
  eventId: string;
  setScanned: any;
}) {
  const { getToken } = useAuth();
  const [scannedUser, setScannedUser] = React.useState<{
    firstName: string;
    lastName: string;
    profilePicture: string;
  }>(null);
  const [scan, setScan] = React.useState<{
    accepted: boolean;
    createdAt: Date;
    eventId: string;
    id: string;
    inviteId: string;
    scannedBy: string;
    userId: string;
  }>(null);
  const [error, setError] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const scanData = await postScan(token, scanValue, eventId);
        setScannedUser(scanData.user);
        setScan(scanData.scan);
        console.log(scanData);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    };

    if (scanValue !== null) {
      fetchData();
    }
  }, [scanValue]);

  function handleClose() {
    setScanned(false);
    setError(false);
  }

  return (
    <Center>
      <Actionsheet isOpen={scanned} onClose={handleClose} zIndex={999}>
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {error ? (
            <Box w="100%" h={400} px={4} justifyContent="center">
              <Text>Error</Text>
            </Box>
          ) : (
            <Box w="100%" h={400} px={4} justifyContent="center">
              <ScannedProfile user={scannedUser} scan={scan} />
            </Box>
          )}
          <ActionsheetItem>
            <Button onPress={handleClose}>
              <Text>Scan next</Text>
            </Button>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Center>
  );
}
