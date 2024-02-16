import React from "react";
import { Box, Image, Text } from "@gluestack-ui/themed";

export default function ScannedProfile({
  user,
  scan,
}: {
  user: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  scan: {
    accepted: boolean;
    createdAt: Date;
    eventId: string;
    id: string;
    inviteId: string;
    scannedBy: string;
    userId: string;
  };
}) {
  return (
    <Box>
      <Image
        source={{ uri: user?.profilePicture }}
        style={{ width: "75%", height: "75%" }}
        alt="profilePicture"
        resizeMode="cover"
      />
      <Text>Name: {user?.firstName + " " + user?.lastName}</Text>
      <Text>
        {String(scan?.createdAt)}
        {/* {scan?.createdAt &&
          "Time: " +
            (scan?.createdAt?.getHours() + ":" + scan?.createdAt?.getMinutes())} */}
      </Text>
    </Box>
  );
}
