import React, { useState, useEffect, useCallback } from "react";
import { Box, SafeAreaView } from "@gluestack-ui/themed";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import ScanPage from "../../components/ScanPage";
import LiveFeed from "../../components/LiveFeed";
import { useAuth } from "@clerk/clerk-expo";
import { getLiveScans } from "../../../hooks/endpoints";
import { useTabsContext } from "../../context/TabsContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Auth {
  getToken: () => Promise<string>;
}

interface LiveEvent {
  id: string;
  name: string;
  live: boolean;
}

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface LiveScan {
  // Define the structure of your live scan data here
  id: string;
  accepted: boolean;
  user: User;
  createdAt: string;
  // Add more fields as needed
}

function ScannerPage() {
  const [liveScans, setLiveScans] = useState<LiveScan[] | null>(null);
  const [eventName, setEventName] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { getToken }: Auth = useAuth();
  const { liveEvents } = useTabsContext();

  // Gets live feed from current live event
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await getToken();
        // Find the first live event
        const liveEvent: LiveEvent | undefined = liveEvents.find((event) => event.live);
        if (liveEvent) {
          setEventName(liveEvent.name);
          setEventId(liveEvent.id);
          // Fetch live scans for the live event
          const liveScansData: LiveScan[] = await getLiveScans(token, liveEvent.id);
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

  // When event doesn't change but scans update
  const fetchScans = useCallback(async () => {
    try {
      const token = await getToken();
      if (eventId) {
        const liveScansData: LiveScan[] = await getLiveScans(token, eventId);
        setLiveScans(liveScansData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  }, [getToken, eventId]);

  // Show loader until fetchData is complete
  return (
    <SafeAreaView bg="$white" style={{ flex: 1 }}>
      <TouchableOpacity onPress={router.back} activeOpacity={1}>
        <Ionicons name="chevron-back" size={40} />
      </TouchableOpacity>
      {loading ? (
        <Box
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#FF025B" />
        </Box>
      ) : (
        <Box style={{ flex: 1 }}>
          <Box marginVertical={10} style={{ flex: 1 }}>
            <ScanPage />
          </Box>
          <LiveFeed liveScans={liveScans} fetchScans={fetchScans} />
        </Box>
      )}
    </SafeAreaView>
  );
}

export default ScannerPage;
