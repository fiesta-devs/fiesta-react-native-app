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
  Button,
  Text,
  Spinner,
} from "@gluestack-ui/themed";
import FiestaID from "./FiestaID";

export default function QRCodeDrawer({
  user,
  isOpen,
  handleClose,
}: {
  user: any;
  isOpen: boolean;
  handleClose: any;
}) {
  console.log(user);
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={handleClose}>
        <ActionsheetContent h={600}>
          <ActionsheetDragIndicatorWrapper
            mt={10}
            position="absolute"
            zIndex={998}
            h={"$32"}
          >
            <ActionsheetDragIndicator h={"$1.5"} w={"$1/4"} />
          </ActionsheetDragIndicatorWrapper>
          <Box
            justifyContent="center"
            alignItems="center"
            w={"$full"}
            paddingTop={"$10"}
            paddingHorizontal={"$4"}
          >
            {user ? <FiestaID user={user} /> : <Spinner color="#FF025B" />}
          </Box>
        </ActionsheetContent>
      </Actionsheet>
    </Center>
  );
}
