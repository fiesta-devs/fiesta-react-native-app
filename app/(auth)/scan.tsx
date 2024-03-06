import React from "react";
import { Text, SafeAreaView } from "@gluestack-ui/themed";
import {  StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ScanPage() {

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="qr-code" size={64} color="#FF025B" />
      <Text style={styles.drawerTriggerText}>yeyeye qr code coming soon</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerTriggerText: {
    color: "#FF025B",
  },
});

export default ScanPage;
