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
} from "@gluestack-ui/themed";
import { Path } from "react-native-svg";
import ScannedProfile from "./ScannedProfile";
import Icon from "./Icon";

export default function ActionSheet({ scanned }: { scanned: boolean }) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  return (
    <Center>
      <Actionsheet isOpen={scanned} onClose={handleClose} zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetContent>
          <Box w="100%" h={400} px={4} justifyContent="center">
            <ScannedProfile />
          </Box>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon>
              <Icon name="check" />
            </ActionsheetIcon>
            <ActionsheetItemText>Get 'em in</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon>
              <Icon name="warning" />
            </ActionsheetIcon>
            <ActionsheetItemText>Come back later</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetIcon>
            <Icon name="close" />
            </ActionsheetIcon>
            <ActionsheetItemText>GTFO</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Center>
  );
}
