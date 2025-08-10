import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import ThemedPressable from '@/components/ThemedPressable';
import { signOut } from '@/services/authServices';

export default function HomeScreen() {
  const { session } = useAuth();

  async function handleSignOut() {
    const {error} = await signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <ThemedView>
      <ThemedText type='title'>Welcome to the app!</ThemedText>
      <ThemedText >{session ? session.user.user_metadata.display_name : 'No user'}</ThemedText>
      <ThemedPressable onPress={handleSignOut}>
        <ThemedText>Sign Out</ThemedText>
      </ThemedPressable>
    </ThemedView>
  );
}