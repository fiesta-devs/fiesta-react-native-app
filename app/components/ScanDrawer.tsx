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
  Spinner,
} from "@gluestack-ui/themed";
import ScannedProfile from "./ScannedProfile";
import { postScan } from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";

export default function ScanDrawer({
  scanned,
  scanValue,
  eventId,
  resetState,
}: {
  scanned: boolean;
  scanValue: string;
  eventId: string;
  resetState: any;
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
      }
    };

    if (scanValue !== null) {
      fetchData();
    }
  }, [scanValue]);

  function handleClose() {
    resetState();
    setError(false);
  }

  if (scannedUser?.profilePicture || error) {
    return (
      <Center>
        <Actionsheet isOpen={scanned} onClose={handleClose} zIndex={999}>
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {error ? (
              <Box
                w="100%"
                h={400}
                px={4}
                justifyContent="center"
                alignItems="center"
              >
                <Text color="red" size="4xl">
                  GTFO
                </Text>
                <Text color="red" size="xl">
                  This code is NOT a valid invite
                </Text>
              </Box>
            ) : (
              <Box w="100%" h={400} px={4} justifyContent="center">
                <ScannedProfile user={scannedUser} scan={scan} />
              </Box>
            )}
            <ActionsheetItem>
              <Box
                justifyContent="center"
                alignItems="center"
                w={"$full"}
                mb={"$10"}
              >
                <Button
                  bgColor={scan?.accepted ? "green" : "red"}
                  onPress={handleClose}
                >
                  <Text bold color="black">
                    Scan next
                  </Text>
                </Button>
              </Box>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </Center>
    );
  } else {
    return <Spinner />;
  }
}
