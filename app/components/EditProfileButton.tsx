import { Button, Text } from "@gluestack-ui/themed";

const EditProfileButton = () => {
  return (
    <Button
      w={"$full"}
      size="xl"
      rounded={"$full"}
      marginTop={8}
    >
      <Text color="#fff" fontWeight="$semibold">
        Edit Profile
      </Text>
    </Button>
  );
};

export default EditProfileButton;
