import {
  Box,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import React from "react";
import { format } from "date-fns";

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Scan {
  accepted: boolean;
  user: User;
  createdAt: string;
}

interface LiveFeedProps {
  liveScans: Scan[] | null;
}

export default function LiveFeed({ liveScans }: LiveFeedProps) {
  return (
    <Box mt={"$6"} mb={"$20"} px={"$2"}>
      {liveScans?.map((scan: Scan, index) => (
        <Box
          key={index}
          style={{
            backgroundColor: scan.accepted ? "#e0ffe0" : "#ffe0e0",
            borderRadius: 50,
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
              {scan.user.firstName[0]}
              {scan.user.lastName[0]}
            </AvatarFallbackText>
            <AvatarImage
              alt={`${scan.user.firstName} ${scan.user.lastName}`}
              source={{
                uri: scan.user.profilePicture,
              }}
            />
          </Avatar>
          <Box style={{ flexDirection: "column" }}>
            <Text size="2xl" fontWeight="$semibold" color="$black">
              {scan.user.firstName} {scan.user.lastName}
            </Text>
            <Text size="sm" color="$gray600">
              {format(new Date(scan.createdAt), "MMM dd, yyyy h:mm a")}{" "}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
