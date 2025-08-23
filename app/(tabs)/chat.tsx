import ThemedPressable from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { signOut } from '@/services/authServices';

export default function TabTwoScreen() {
  async function handleSignOut() {
    const { error } = await signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <ThemedView className='pt-20 flex flex-col gap-4 h-full'>
      <ThemedText type='title'>Chat</ThemedText>
      <ThemedPressable onPress={handleSignOut}>
        <ThemedText>Logout</ThemedText>
      </ThemedPressable>
    </ThemedView>
  );
}
