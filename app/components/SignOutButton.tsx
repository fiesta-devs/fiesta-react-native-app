import { useClerk } from "@clerk/clerk-react";
import { Pressable, Text } from "react-native";
 
// Clicking on this button will sign out a user and reroute them to the "/" (home) page.
const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Pressable onPress={() => signOut()}>
      <Text>Sign out</Text>
    </Pressable>
  );
};

export default SignOutButton;