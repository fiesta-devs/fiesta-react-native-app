import { useClerk } from "@clerk/clerk-react";
import { Pressable, Text } from "react-native";
 
const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    // Clicking on this button will sign out a user and reroute them to the "/" (home) page.
    <Pressable onPress={() => signOut()}>
      <Text>Sign out</Text>
    </Pressable>
  );
};

export default SignOutButton;