import React from "react";
import { Box, SafeAreaView, Text } from "@gluestack-ui/themed";
import { useTabsContext } from "../context/TabsContext";

export default function Home() {
  const { invites } = useTabsContext();

  //MIGHT NEED TO ADD A FEATURE THAT TOGGLES SHOWING LIVE FEED TO GUESTS
  if (invites?.length > 0) {
    return (
      <SafeAreaView>
      <Box w={"$full"} h={"$full"} px={"$1"}>
        {invites.map((invite, index) => (
          <Box key={index} mt={"$12"} px={"$4"}>
            <Text size="4xl" fontWeight="$semibold" color="#000">
              {invite.name}
            </Text>
            <Text size="xl" color="#000">
             {invite.description}
            </Text>
            <Box
              style={{ height: 1, backgroundColor: "#e0e0e0", marginTop: 5 }}
            />
          </Box>
        ))}
      </Box>
    </SafeAreaView>
    );
  } else {
    return (
      <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{"No invites :("}</Text>
      </Box>
    );
  }
}
