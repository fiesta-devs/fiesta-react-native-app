import React from "react";
import {
  Box,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { format } from "date-fns";

interface LiveFeedUserProps {
  accepted: boolean;
  firstName: string;
  lastName: string;
  profilePictureURI: string;
  createdAt: string;
}

export default function LiveFeedUser({
  accepted,
  firstName,
  lastName,
  profilePictureURI,
  createdAt,
}: LiveFeedUserProps) {
  return (
    <Box
      style={{
        backgroundColor: accepted ? "#e0ffe0" : "#ffe0e0",
        borderRadius: 25,
        borderColor: "#73737350",
        padding: 10,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
      }}
    >
      <Avatar
        bgColor="$amber800"
        size="lg"
        borderRadius="$full"
        style={{ marginVertical: 1, marginRight: 15 }}
      >
        <AvatarFallbackText>
          {firstName[0]}
          {lastName[0]}
        </AvatarFallbackText>
        <AvatarImage
          alt={`${firstName} ${lastName}`}
          source={{
            uri: profilePictureURI,
          }}
        />
      </Avatar>
      <Box style={{ flexDirection: "column" }}>
        <Text size="2xl" fontWeight="$semibold" color="#000">
          {firstName} {lastName}
        </Text>
        <Text size="sm" color="#B0B0B0">
          {format(new Date(createdAt), "MMM dd, yyyy h:mm a")}{" "}
        </Text>
      </Box>
    </Box>
  );
}
