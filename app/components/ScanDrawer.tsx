import React from "react";
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

export default function ScanDrawer({ scanned }: { scanned: boolean }) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
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
