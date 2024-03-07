import React, { useState } from "react";
import { Box, Text, SafeAreaView } from "@gluestack-ui/themed";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, Stack, router } from "expo-router";
import QRCodeDrawer from "../../components/QRCodeDrawer";

function ScannerPage() {
  return (
    <SafeAreaView>
      <Text>scanner page</Text>
    </SafeAreaView>
  );
}

export default ScannerPage;
