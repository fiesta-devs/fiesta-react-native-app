import React, { useState, useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { getUserProfile } from "../hooks/endpoints";
import { ActivityIndicator } from "react-native";


const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const InitialLayout = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) {
      // If authentication data is not loaded, we can't proceed
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        const profileData = await getUserProfile(token);
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Ensure we set loading to false in all cases
      }
    };

    if (isSignedIn) {
      // Only fetch user profile if signed in
      fetchUserProfile();
    } else {
      // If not signed in, we can consider loading complete
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, getToken]);

  useEffect(() => {
    if (loading) {
      // If still loading, don't proceed with routing
      return;
    }

    // Define the routing logic based on the current authentication state and user profile
    const navigateBasedOnAuthState = () => {
      const inTabsGroupAuth = segments[0] === "(auth)";
      const inTabsGroupUser = segments[0] === "(user)";

      if (isSignedIn) {
        if (userProfile?.admin) {
          if (!inTabsGroupAuth) {
            router.replace("/scan");
          }
        } else if (!inTabsGroupUser) {
          router.replace("/userhome");
        }
      } else {
        router.replace("/login");
      }
    };

    navigateBasedOnAuthState();
  }, [loading, isSignedIn, userProfile, segments, router]);

  // Render nothing or a loading spinner if necessary
  return loading ? <ActivityIndicator /> : <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <GluestackUIProvider config={config}>
        <InitialLayout />
      </GluestackUIProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
