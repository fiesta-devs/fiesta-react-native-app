import React from "react";
import { StyleSheet } from "react-native";
import FiestaID from "../components/FiestaID";
import { useTabsContext } from "../context/TabsContext";
import { SafeAreaView, Box, Text, Spinner } from "@gluestack-ui/themed";

export default function Scan() {
  const { userProfile } = useTabsContext();

  return (
    <SafeAreaView style={styles.container}>
      {userProfile ? (
        <Box>
          <Box style={styles.appNameTextBox}>
            <Text style={styles.appNameText}>Fiesta</Text>
          </Box>
          <Box style={styles.note}>
            <Text style={styles.noteText}>
              <Text style={styles.boldText}>Note:</Text> This is your Fiesta ID.
              Screenshot now to scan into parties without having to open Fiesta.
            </Text>
          </Box>
          <FiestaID user={userProfile} />
        </Box>
      ) : (
        <Box sx={{ flex: 1 }}>
          <Box style={styles.appNameTextBox}>
            <Text style={styles.appNameText}>Fiesta</Text>
          </Box>
          <Box style={styles.spinnerBox}>
            <Spinner color="#FF025B" />
          </Box>
        </Box>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  spinnerBox: {
    flex: 1,
    justifyContent: "center",
  },
  appNameText: {
    fontSize: 48,
    lineHeight: 50,
    color: "#FF025B",
    fontFamily: "Snell Roundhand",
    fontWeight: "900",
  },
  appNameTextBox: {
    margin: 16,
    alignItems: "center",
  },
  note: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderColor: "#999999",
  },
  noteText: {
    textAlign: "center",
    fontSize: 14,
    color: "#999999",
  },
  boldText: {
    color: "#777777",
    fontWeight: "bold",
  },
});
