import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import SignOutButton from '../components/SignOutButton'
import { Avatar, AvatarFallbackText} from "@gluestack-ui/themed";

const Profile = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center' }}>
        {user.firstName} {user.lastName}
      </Text>
      <Avatar bgColor=/*{`${user.color}`}*/"$amber800" size="md" borderRadius="$full">
        {/*<AvatarFallbackText>{user.fullName}</AvatarFallbackText>*/ <AvatarFallbackText>Drew Amunategui</AvatarFallbackText>}
      </Avatar>
      <SignOutButton />
    </View>
  );
};

export default Profile;