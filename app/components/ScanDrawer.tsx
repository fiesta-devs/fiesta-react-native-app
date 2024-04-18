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
import ErrorProfile from "./ErrorProfile";

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

export default function ScanDrawer({
  scanned,
  scan,
  resetState,
  error
}: {
  scanned: boolean;
  scan: Scan;
  resetState: any;
  error: boolean;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);

  function handleClose() {
    resetState();
    setLoading(false);
  }

  function getScanColor() {
    return scan?.accepted ? "#E6FFE0" : "#FFE0E0";
  }

  if (loading) {
    return <Spinner />;
  }
  else if (error || scan) {
    console.log("error: " + error);
    console.log("scan: " + scan);
    return (
      <Center>
        <Actionsheet isOpen={scanned} onClose={handleClose}>
          <ActionsheetContent bg={getScanColor()} h={"$3/4"}>
            <ActionsheetDragIndicatorWrapper
              mt={10}
              position="absolute"
              h={"$3/4"}
              zIndex={998}
            >
              <ActionsheetDragIndicator h={"$1.5"} w={"$1/4"} />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem>
              <Box
                h={"$1/2"}
                justifyContent="center"
                alignItems="center"
                w={"$full"}
                mb={"$20"}
              >
                <Box w="75%" px={4} justifyContent="center" bg={getScanColor()}>
                  {error ? (
                    <ErrorProfile user={scan?.user} />
                  ) : (
                    <ScannedProfile scan={scan} />
                  )}
                </Box>
              </Box>
            </ActionsheetItem>
            <ActionsheetItem>
              <Box justifyContent="center" alignItems="center" w={"$full"}>
                <Button
                  bgColor={"white" /* scan?.accepted ? "green" : "red"*/}
                  onPress={handleClose}
                  borderRadius={"$full"}
                  w={"75%"}
                  h={"30%"}
                  zIndex={999}
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
    return null
  }
}
