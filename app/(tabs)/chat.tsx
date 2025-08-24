import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CallOngoingScreen from '../call-ongoing';

export default function TabTwoScreen() {
  return (
    <ThemedView className='pt-20 flex flex-col gap-4 h-full'>
      <ThemedText type='title' className='text-primary'>Chat</ThemedText>
    </ThemedView>

  );
}
