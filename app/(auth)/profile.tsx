import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, Box } from "@gluestack-ui/themed";
import SignOutButton from "../components/SignOutButton";
//import EditProfileButton from "../components/EditProfileButton";
import { Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";
import { useTabsContext } from "../context/TabsContext";
import { StyleSheet } from "react-native";

const Profile = () => {
  const { userProfile, setUserProfile, invites } = useTabsContext();
  console.log("Profile: " + userProfile);
  const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;
  const [joined, setJoined] = useState(null);

  useEffect(() => {
    const convertToEnglishDateTime = (isoTimestamp: string): string => {
      const date = new Date(isoTimestamp);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      return date.toLocaleString("en-US", options);
    };
    const convertToMonthYear = (isoTimestamp: string): string => {
      const date = new Date(isoTimestamp);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
      };
      return date.toLocaleString("en-US", options);
    };

    setJoined(convertToMonthYear(userProfile?.createdAt));
  }, [userProfile]);

  return (
    <SafeAreaView h={"$full"} backgroundColor="white">
      <Box flex={1} gap={"$1"} px={"$5"} pt={"$20"}>
        <Avatar
          bgColor=/*{`${user.color}`}*/ "$amber800"
          size="2xl"
          borderRadius="$full"
          style={{ marginBottom: 5 }}
        >
          <AvatarFallbackText>{fullName}</AvatarFallbackText>
          <AvatarImage
            alt="profile picture"
            source={{
              uri: `${userProfile?.profilePicture}`,
            }}
          />
        </Avatar>
        <Text size="2xl" fontWeight="$semibold" color="$black">
          {userProfile?.firstName} {userProfile?.lastName}
        </Text>
        <Box flexDirection="row">
          <Text size="md" fontWeight="$semibold" color="#999999">
            JHU '24
          </Text>
          <Text size="md" fontWeight="$semibold" color="#999999">
            {` • Member since ${joined}`}
          </Text>
        </Box>
        <Box style={styles.container}>
          <Box style={styles.box}>
            <Text style={styles.text}>Invited</Text>
            <Text style={styles.subtext}>{invites?.length}</Text>
          </Box>
          <Box style={[styles.box, styles.border]}>
            <Text style={styles.text}>Attended</Text>
            <Text style={styles.subtext}>0</Text>
          </Box>
          <Box style={styles.box}>
            <Text style={styles.text}>Groups</Text>
            <Text style={styles.subtext}>0</Text>
          </Box>
        </Box>
        {/* edit profile <EditProfileButton /> */}
        {/* show avatar past scroll avatar*/}
        <SignOutButton />
      </Box>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginVertical: 16,
  },
  box: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#eeeeee",
    borderWidth: 1,
  },
  border: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 12,
  },
});
