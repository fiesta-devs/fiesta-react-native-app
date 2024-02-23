import React, { useCallback, useState } from "react";
import { Box, RefreshControl, ScrollView, Text } from "@gluestack-ui/themed";
import LiveFeedUser from "./LiveFeedUser";

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
  fetchScans: () => Promise<void>;
}

export default function LiveFeed({ liveScans, fetchScans }: LiveFeedProps) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScans();
  }, [fetchScans]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box mt={"$6"} mb={"$6"} px={"$2"}>
        {liveScans?.length > 0 ? (
          liveScans?.map((scan: Scan, index) => (
            <LiveFeedUser
              key={index}
              accepted={scan.accepted}
              firstName={scan.user.firstName}
              lastName={scan.user.lastName}
              profilePictureURI={scan.user.profilePicture}
              createdAt={scan.createdAt}
            />
          ))
        ) : (
          <Text> {"No one at da party :("}</Text>
        )}
      </Box>
    </ScrollView>
  );
}
