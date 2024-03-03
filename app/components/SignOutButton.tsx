import { useClerk } from "@clerk/clerk-react";
import { Button, Text } from "@gluestack-ui/themed";

// Clicking on this button will sign out a user and reroute them to the "/" (home) page.
const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button
      w={"$full"}
      bg="#FF025B"
      size="xl"
      rounded={"$full"}
      marginTop={8}
      onPress={() => signOut()}
    >
      <Text color="#fff" fontWeight="$semibold">
        Sign out
      </Text>
    </Button>
  );
};

export default SignOutButton;
