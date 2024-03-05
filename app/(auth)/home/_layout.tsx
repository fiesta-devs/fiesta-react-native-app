import { Stack } from 'expo-router';
import React from 'react';

export default function HomeStack() {
  return (
  <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#eeeeee',
    },
    headerTintColor: '#FF025Bcc',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
    <Stack.Screen name='index' options={{headerTitle:'Invites'}}/>
  </Stack>)
}