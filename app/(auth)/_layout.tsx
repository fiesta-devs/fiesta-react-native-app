import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { TabsProvider } from "../context/TabsContext";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#FF025B"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <TabsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          tabBarActiveTintColor: "#FF025B",
        }}
      >
        <Tabs.Screen
          name="live"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="eye-outline" size={size} color={color} />
            ),
            tabBarLabel: "Live",
          }}
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="scan"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="scan" size={size} color={color} />
            ),
            tabBarLabel: "Scan",
          }}
          redirect={!isSignedIn}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            tabBarLabel: "Profile",
          }}
          redirect={!isSignedIn}
        />
      </Tabs>
    </TabsProvider>
  );
};

export default TabsPage;
