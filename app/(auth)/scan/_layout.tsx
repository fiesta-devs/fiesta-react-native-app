import { Stack } from "expo-router";
import React from "react";

export default function ScanStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#eeeeee",
        },
        headerTintColor: "#FF025Bcc",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
