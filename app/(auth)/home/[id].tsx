import React from "react";
import { Text, Box, Button } from "@gluestack-ui/themed";
import { useLocalSearchParams, router, Stack } from "expo-router";

export default function Page() {
  const { invite } = useLocalSearchParams();
  console.log("Invite string to parse:", invite);
  const inviteString = Array.isArray(invite) ? invite[0] : invite;
  const inviteObject = invite ? JSON.parse(decodeURIComponent(inviteString)) : null;

  return (
    <>
      <Stack.Screen options={{ headerTitle: `${inviteObject.name}` }} />
      <Box>
        <Text>Event Details {inviteObject.name}</Text>
      </Box>
    </>
  );
}
