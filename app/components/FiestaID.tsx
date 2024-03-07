import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text, Image } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import QRCodeComponent from "./QRCodeComponent";

export default function FiestaID({ user }) {
  return (
    <Box style={styles.container}>
      <Box style={styles.card}>
        <Box style={styles.qrCodeIconContainer}>
          <Ionicons name="qr-code" size={48} color="#FF025B" />
        </Box>
        <Box style={styles.nameBox}>
          <Text style={styles.name}>
            {user.firstName + " " + user.lastName}
          </Text>
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profilePicture}
            alt="profile picture"
          />
        </Box>
        <QRCodeComponent value={user.id} size={160} />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  qrCodeIconContainer: {
    position: "absolute",
    width: 64,
    height: 64,
    backgroundColor: "white",
    left: 48,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
    backgroundColor: "#FF025B",
    borderRadius: 16,
    width: "100%",
  },
  nameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
    lineHeight: 30,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
