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
  Icon,
  CheckIcon,
  AlertCircleIcon,
  CloseIcon,
} from "@gluestack-ui/themed";
import ScannedProfile from "./ScannedProfile";
import { scan } from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";

export default function ScanDrawer({
  scanned,
  scanValue,
  eventId,
}: {
  scanned: boolean;
  scanValue: string;
  eventId: string;
}) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const { getToken } = useAuth();
  const [name, setName] = React.useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const scanData = await scan(token, scanValue, eventId);
        setName(scanData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [scanValue]);

  const handleClose = () => setShowActionsheet(!showActionsheet);
  return (
    <Center>
      <Actionsheet isOpen={scanned} onClose={handleClose} zIndex={999}>
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box w="100%" h={400} px={4} justifyContent="center">
            <ScannedProfile />
          </Box>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon>
              <Icon as={CheckIcon} />
            </ActionsheetIcon>
            <ActionsheetItemText>{name}</ActionsheetItemText>
            <ActionsheetItemText>Get 'em in</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon>
              <Icon as={AlertCircleIcon} />
            </ActionsheetIcon>
            <ActionsheetItemText>Come back later</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon>
              <Icon as={CloseIcon} />
            </ActionsheetIcon>
            <ActionsheetItemText>GTFO</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Center>
  );
}
