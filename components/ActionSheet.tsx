import React from "react";
import { Actionsheet, Box, Button, Text, useDisclose, Center, Icon } from "native-base";
import { Path } from "react-native-svg";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import ScannedProfile from "./ScannedProfile";

export default function ActionSheet() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return <Center>
      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={400} px={4} justifyContent="center">
            <ScannedProfile />
          </Box>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="check" />}>
            Get 'em in
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="warning" />}>
            Come back later
          </Actionsheet.Item>
          <Actionsheet.Item onPress={onClose} startIcon={<Icon viewBox="0 0 24 24" size="6" fill="none">
                <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
              </Icon>}>
            GTFO
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}