import React, { useState, useEffect, useCallback } from "react";
import { Box, SafeAreaView } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import ScanPage from "../../components/ScanPage";
import LiveFeed from "../../components/LiveFeed";

import { useAuth } from "@clerk/clerk-expo";
import { getLiveScans } from "../../../hooks/endpoints";
import { useTabsContext } from "../../context/TabsContext";

interface Auth {
  getToken: () => Promise<string>;
}

function ScannerPage() {
  const [liveScans, setLiveScans] = useState<any[] | null>(null);
  const [eventName, setEventName] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { getToken }: Auth = useAuth();
  const { liveEvents } = useTabsContext();

  //gets live feed from current live event
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await getToken();
        // Find the first live event
        const liveEvent = liveEvents.find((event) => event.live);
        if (liveEvent) {
          setEventName(liveEvent.name);
          setEventId(liveEvent.id);
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

  //when event doesn't change but scans update
  const fetchScans = useCallback(async () => {
    try {
      const token = await getToken();
      // Find the first live event
      if (eventId) {
        const liveScansData = await getLiveScans(token, eventId);
        setLiveScans(liveScansData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  }, [getToken, eventId]);

  //show loader until fetchData is complete
  if (loading) {
    return (
      <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <SafeAreaView bg="$white" style={{ flex: 1 }}>
      <Box marginVertical={10}>
        <ScanPage />
        <LiveFeed liveScans={liveScans} fetchScans={fetchScans} />
      </Box>
    </SafeAreaView>
  );
}

export default ScannerPage;
