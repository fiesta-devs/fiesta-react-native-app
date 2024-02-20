import React from "react";
import {
  Avatar,
  AvatarImage,
  Box,
  Text,
  createIcon,
  Icon,
  AlertCircleIcon
} from "@gluestack-ui/themed";
import { Path } from "react-native-svg";

export default function ScannedProfile({
  user,
  scan,
}: {
  user?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
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
        bgColor={"#FD9C9C"}
        size="2xl"
        borderRadius="$full"
        style={{ marginBottom: 15, marginTop: 25 }}
      >
        <AvatarImageSource user={user} />
      </Avatar>
      {user?.firstName && user?.lastName ? (
        <Text size={"4xl"} fontWeight={"$semibold"} color="black">
          {user?.firstName + " " + user?.lastName}
        </Text>
      ) : (
        <Text size={"4xl"} fontWeight={"$semibold"} color="black">
          FRAUD
        </Text>
      )}
      <Box
        bgColor={"#FF9C9C"}
        borderRadius="$full"
        w={"100%"}
        h={"20%"}
        justifyContent="center"
        alignItems="center"
        mt={30}
      >
        <Text bold color="black">
          GTFO
        </Text>
      </Box>
    </Box>
  );
}

const ShieldQuestionIcon = createIcon({
  viewBox: "0 0 32 32",
  path: (
    <Path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-2-5a3 3 0 1 1 4.94-2.2c0 2-3 3-3 3zm1-4h.01"
    />
  ),
});

function AvatarImageSource({
  user,
}: {
  user?: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
}): JSX.Element {
  return (
    <Box justifyContent="center" alignItems="center">
      {user?.profilePicture ? (
        <AvatarImage
          alt="profile picture"
          source={{
            uri: user.profilePicture,
          }}
        />
      ) : (
        <Icon as={AlertCircleIcon} color="$error100" m="$2" w="$20" h="$20" />
      )}
    </Box>
  );
}
