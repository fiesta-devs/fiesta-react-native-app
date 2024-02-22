import { Box, SafeAreaView, Text } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { getLiveScans } from "../../hooks/endpoints";
import { useTabsContext } from "../context/TabsContext";
import LiveFeed from "../components/LiveFeed";

interface Auth {
  getToken: () => Promise<string>;
}

export default function Live() {
  const [liveScans, setLiveScans] = useState<any[] | null>(null);
  const [eventName, setEventName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { getToken }: Auth = useAuth();
  const { liveEvents } = useTabsContext();

  //gets live feed from current live event
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        // Find the first live event
        const liveEvent = liveEvents.find((event) => event.live);
        if (liveEvent) {
          setEventName(liveEvent.name);
          // Fetch live scans for the live event
          const liveScansData = await getLiveScans(token, liveEvent.id);
          setLiveScans(liveScansData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [getToken, liveEvents]);

  //show loader until fetchData is complete
  if (loading) {
    return (
      <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </Box>
    );
  }
  // show live feed if there are any live events
  else if (liveEvents.length > 0) {
    return (
      <SafeAreaView>
        <Box w={"$full"} h={"$full"} px={"$4"}>
          <Box mt={"$12"} mb={"$5"}>
            <Text size="4xl" fontWeight="$semibold" color="$black">
              {eventName}
            </Text>
            <Text size="xl" fontWeight="$semibold" color="$black">
              live feed:
            </Text>
          </Box>
          <LiveFeed liveScans={liveScans}/>
        </Box>
      </SafeAreaView>
    );
  } else {
    return (
      <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No live Events!</Text>
      </Box>
    );
  }
}
