import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getMe,
} from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";

interface TabsContextType {
  userProfile: any | null; // Replace 'any' with the appropriate type for your user profile
  setUserProfile: (userProfile: any | null) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};

interface TabsProviderProps {
  children: ReactNode;
}

interface Auth {
  getToken: () => Promise<string>;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [invites, setInvites] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { getToken }: Auth = useAuth();

  //gets user and events for the entire app once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const userProfileData = await getMe(token);
        console.log("user: ", userProfileData);
        setUserProfile(userProfileData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [getToken]);

  //show loader until fetchData is complete
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //rendered once all data is fetched
  return (
    <TabsContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
