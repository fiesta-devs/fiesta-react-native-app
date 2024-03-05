import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import LiveEventIndicator from "../components/LiveEventIndicator";

export default function LiveEventCard({ invite }) {
  return (
    <Box style={styles.liveEventCard}>
      <Box style={styles.liveEventNameBox}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.liveEventName}
        >
          {invite.name}
        </Text>
      </Box>
      <Box style={styles.liveEventIndicatorBox}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.liveEventLive}
        >
          Live
        </Text>
        <LiveEventIndicator />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  liveEventCard: {
    padding: 16,
    margin: 16,
    marginHorizontal: 24,
    marginTop: 0,
    backgroundColor: "#FF025B",
    elevation: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  liveEventName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF",
  },
  liveEventIndicatorBox: {
    position: "absolute",
    right: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  liveEventLive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginRight: 12,
  },
  liveEventNameBox: {
    padding: 8,
  },
});
