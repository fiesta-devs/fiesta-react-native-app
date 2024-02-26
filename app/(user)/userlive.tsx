import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { Box, SafeAreaView, Text } from "@gluestack-ui/themed";
import { useAuth } from "@clerk/clerk-expo";
import { getLiveScans } from "../../hooks/endpoints";
import { useTabsContext } from "../context/TabsContext";
import LiveFeed from "../components/LiveFeed";

interface Auth {
  getToken: () => Promise<string>;
}

export default function Userlive() {
  // const [liveScans, setLiveScans] = useState<any[] | null>(null);
  // const [eventName, setEventName] = useState<string>("");
  // const [eventId, setEventId] = useState<string>("");
  // const [loading, setLoading] = useState(true);
  // const { getToken }: Auth = useAuth();
  // const { liveEvents } = useTabsContext();

  // //gets live feed from current live event
  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     try {
  //       const token = await getToken();
  //       // Find the first live event
  //       const liveEvent = liveEvents.find((event) => event.live);
  //       if (liveEvent) {
  //         setEventName(liveEvent.name);
  //         setEventId(liveEvent.id);
  //         // Fetch live scans for the live event
  //         const liveScansData = await getLiveScans(token, liveEvent.id);
  //         setLiveScans(liveScansData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false); // Set loading to false after data is fetched
  //     }
  //   };

  //   fetchData();
  // }, [getToken, liveEvents]);

  // //when event doesn't change but scans update
  // const fetchScans = useCallback(async () => {
  //   try {
  //     const token = await getToken();
  //     // Find the first live event
  //     if (eventId) {
  //       const liveScansData = await getLiveScans(token, eventId);
  //       setLiveScans(liveScansData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false); // Set loading to false after data is fetched
  //   }
  // }, [getToken, eventId]);

  // //show loader until fetchData is complete
  // if (loading) {
  //   return (
  //     <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </Box>
  //   );
  // }
  // // show live feed if there are any live events

  // //MIGHT NEED TO ADD A FEATURE THAT TOGGLES SHOWING LIVE FEED TO GUESTS
  // else if (liveEvents.length > 0) {
  //   return (
  //     <SafeAreaView>
  //       <Box w={"$full"} h={"$full"} px={"$1"}>
  //         <Box mt={"$12"} px={"$4"}>
  //           <Text size="4xl" fontWeight="$semibold" color="#000">
  //             {eventName}
  //           </Text>
  //           <Box
  //             style={{ height: 1, backgroundColor: "#e0e0e0", marginTop: 5 }}
  //           />
  //         </Box>
  //         <LiveFeed liveScans={liveScans} fetchScans={fetchScans} />
  //       </Box>
  //     </SafeAreaView>
  //   );
  // } else {
  //   return (
  //     <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>No live Events!</Text>
  //     </Box>
  //   );
  // }

  return (
    <SafeAreaView>
      <Box justifyContent="center">
        <Text color="black" size="4xl">
          user live feed
        </Text>
      </Box>
    </SafeAreaView>
  );
}
