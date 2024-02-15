import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUserProfile, getLiveEvents } from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";

interface TabsContextType {
  liveEvents: any[]; // Replace 'any' with the appropriate type for your events
  setLiveEvents: (events: any[]) => void;
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
  const { getToken }: Auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const userProfileData = await getUserProfile(token);
        setUserProfile(userProfileData);

        const eventsData = await getLiveEvents(token);
        setLiveEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <TabsContext.Provider
      value={{ liveEvents, setLiveEvents, userProfile, setUserProfile }}
    >
      {children}
    </TabsContext.Provider>
  );
};
