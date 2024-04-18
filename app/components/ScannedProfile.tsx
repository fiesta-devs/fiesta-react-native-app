import React from "react";
import { Avatar, AvatarImage, Box, Text } from "@gluestack-ui/themed";

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
    <Box justifyContent="center" alignItems="center" w={"$full"}>
      <Avatar
        bgColor=/*{`${user.color}`}*/ "$amber800"
        size="2xl"
        borderRadius="$full"
        style={{ marginBottom: 15, marginTop: 25 }}
      >
        <AvatarImage
          alt="profile picture"
          source={{
            uri: `${user?.profilePicture}`,
          }}
        />
      </Avatar>
      <Text size={"4xl"} fontWeight={"$semibold"} color="black">
        {user?.firstName + " " + user?.lastName}
      </Text>
      {scan?.accepted ? <Box
        bgColor={"#AFFF9C"}
        borderRadius={"$full"}
        w={"100%"}
        h={"20%"}
        justifyContent="center"
        alignItems="center"
        mt={30}
      >
        <Text bold color="black">Get 'EM IN</Text>
      </Box> : <Box
        bgColor={"#FD9C9C"}
        borderRadius={"$full"}
        w={"100%"}
        h={"20%"}
        justifyContent="center"
        alignItems="center"
        mt={30}
      >
        <Text bold color="black">GTFO</Text>
      </Box>}

      {/*<Text>
        {String(scan?.createdAt)}
        {/* {scan?.createdAt &&
          "Time: " +
            (scan?.createdAt?.getHours() + ":" + scan?.createdAt?.getMinutes())} }
      </Text>*/}
    </Box>
  );
}
