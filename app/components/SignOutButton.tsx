import { useClerk } from "@clerk/clerk-react";
import { Button, Text } from "@gluestack-ui/themed"
 
// Clicking on this button will sign out a user and reroute them to the "/" (home) page.
const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button bg='#FF025B' onPress={() => signOut()}>
      <Text color="#fff" >Sign out</Text>
    </Button>
  );
};

export default SignOutButton;