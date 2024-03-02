import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, Box } from "@gluestack-ui/themed";
import SignOutButton from "../components/SignOutButton";
import { Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";
import { useTabsContext } from "../context/TabsContext";

const Profile = () => {
  const { userProfile, setUserProfile } = useTabsContext();
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

    setJoined(convertToEnglishDateTime(userProfile?.createdAt));
  }, [userProfile]);

  return (
    <SafeAreaView h={"$full"} backgroundColor="white">
      <Box flex={1} gap={"$1"} px={"$5"} pt={"$20"}>
        <Avatar
          bgColor=/*{`${user.color}`}*/ "$amber800"
          size="2xl"
          borderRadius="$full"
          style={{ marginBottom: 10 }}
        >
          <AvatarFallbackText>{fullName}</AvatarFallbackText>
          <AvatarImage
            alt="profile picture"
            source={{
              uri: `${userProfile?.profilePicture}`,
            }}
          />
        </Avatar>
        <Text
          size="2xl"
          fontWeight="$semibold"
          color="$black"
        >
          {userProfile?.firstName} {userProfile?.lastName}
        </Text>
        <Text
          size="md"
          marginBottom={"$10"}
          fontWeight="$semibold"
          color="#999999"
        >
          Joined on {joined}
        </Text>
        {/* invited, attended, groups*/}
        {/* edit profile*/}
        {/* show avatar past scroll avatar*/}
        <SignOutButton />
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
