import React from "react";
import { Box, Text, SafeAreaView } from "@gluestack-ui/themed";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, Stack, router } from "expo-router";

function formatDate(date) {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() - 2000}`;
}

function EventInfo({ orgName, location, date, startTime, endTime }) {
  return (
    <Box>
      {orgName && (
        <Box style={styles.infoContainer}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            style={styles.iconStyle}
          />
          <Text style={styles.text}>{orgName}</Text>
        </Box>
      )}
      {location && (
        <Box style={styles.infoContainer}>
          <Ionicons name="location" size={20} style={styles.iconStyle} />
          <Text style={styles.text}>{location || "TBA"}</Text>
        </Box>
      )}
      {date && (
        <Box style={styles.infoContainer}>
          <Ionicons name="calendar" size={20} style={styles.iconStyle} />
          <Text style={styles.text}>{date ? formatDate(date) : "TBA"}</Text>
        </Box>
      )}
      {startTime && (
        <Box style={styles.infoContainer}>
          <Ionicons name="time" size={20} style={styles.iconStyle} />
          <Text style={styles.text}>
            {startTime
              ? `${startTime}${endTime ? ` - ${endTime}` : ""}`
              : "TBA"}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function EventPage() {
  const { invite } = useLocalSearchParams();
  console.log("Invite string to parse:", invite);
  const inviteString = Array.isArray(invite) ? invite[0] : invite;
  const inviteObject = invite
    ? JSON.parse(decodeURIComponent(inviteString))
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.drawerTrigger}
        onPress={router.back}
        activeOpacity={1}
      >
        <Ionicons style={styles.backButton} name="chevron-back" size={40} />
        <Ionicons name="qr-code" size={64} color="#fff" />
        <Text style={styles.drawerTriggerText}>Tap here to scan</Text>
      </TouchableOpacity>
      <Box style={styles.content}>
        <Text style={styles.eventName}>{inviteObject.name}</Text>
        <EventInfo
          orgName={inviteObject.orgAcronym}
          location={inviteObject.organization}
          date={inviteObject.date}
          startTime={"9pm"}
          endTime={"1am"}
        />
        <Box style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text>{inviteObject.description}</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  swipeActionContainer: {
    backgroundColor: "#FF025B",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 20,
  },
  swipeActionText: {
    color: "white",
    fontSize: 24,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  drawerTrigger: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#FF025B",
    width: "100%",
    height: "33%",
  },
  drawerTriggerText: {
    color: "#fff",
  },
  content: {
    padding: 16,
  },
  eventName: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  iconStyle: {
    color: "#FF025B",
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 999,
    color: "white",
  },
});

export default EventPage;
