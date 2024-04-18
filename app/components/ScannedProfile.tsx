import React from "react";
import { Avatar, AvatarImage, Box, Text } from "@gluestack-ui/themed";

interface Scan {
  id: number;
  accepted: boolean;
  eventId: number;
  inviteId: number;
  userId: number;
  createdById: number;
  createdAt: string;
  user: User;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  scans: Scan[];
}

export default function ScannedProfile({
  scan
}: {
  scan: Scan
}) {
  console.log("scanned profile")
  console.log("scan: ", scan);
  console.log("user: ", scan?.user);
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
            uri: `${scan?.user?.profilePicture}`,
          }}
        />
      </Avatar>
      <Text size={"4xl"} fontWeight={"$semibold"} color="black">
        {scan?.user?.firstName + " " + scan?.user?.lastName}
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
