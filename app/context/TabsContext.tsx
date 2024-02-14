import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUserProfile, getEvents } from "../../hooks/endpoints";
import { useAuth } from "@clerk/clerk-expo";

interface TabsContextType {
  events: any[]; // Replace 'any' with the appropriate type for your events
  setEvents: (events: any[]) => void;
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

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const userProfileData = await getUserProfile(token);
        setUserProfile(userProfileData);

        //const eventsData = await getEvents(token);
        //setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <TabsContext.Provider
      value={{ events, setEvents, userProfile, setUserProfile }}
    >
      {children}
    </TabsContext.Provider>
  );
};
