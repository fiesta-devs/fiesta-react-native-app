import React, { useState, useEffect } from "react";
import { View, Text } from "@gluestack-ui/themed";
import SignOutButton from "../components/SignOutButton";
import { Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";
import { useTabsContext } from "../context/TabsContext";

const Profile = () => {
  const { userProfile, setUserProfile } = useTabsContext();
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Avatar
        bgColor=/*{`${user.color}`}*/ "$amber800"
        size="2xl"
        borderRadius="$full"
        style={{ marginBottom: 20 }}
      >
        <AvatarFallbackText>{fullName}</AvatarFallbackText>
        <AvatarImage
          alt="profile picture"
          source={{
            uri: `${userProfile?.profilePicture}`,
          }}
        />
      </Avatar>
      <Text size="2xl" style={{ textAlign: "center", marginBottom: 10 }}>
        {userProfile?.firstName} {userProfile?.lastName}
      </Text>
      <Text size="md" style={{ textAlign: "center" }}>
        {userProfile?.phone}
      </Text>
      <Text size="2xs" style={{ textAlign: "center", marginBottom: 40 }}>
        Joined on {joined}
      </Text>
      <SignOutButton />
    </View>
  );
};

export default Profile;
