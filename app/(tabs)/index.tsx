import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/services/authServices';
import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import LocationSvg from "@/assets/illustration/location.svg"
import FireStationSvg from "@/assets/illustration/fire-station.svg"
import HospitalSvg from "@/assets/illustration/hospital.svg"
import PoliceSvg from "@/assets/illustration/police.svg"
import IconCards from '@/components/cards/IconCards';
import StartCallButton from '@/components/buttons/StartCallButton';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export default function HomeScreen() {
  const { session } = useAuth();
  const { location } = useCurrentLocation();
  
  return (
    <ThemedView className='pt-20 flex flex-col gap-4 h-full'>
      <ThemedText type='title' className='text-primary'>Halo, {toTitleCase(session?.user.user_metadata.display_name)}</ThemedText>

      <View className='flex flex-row p-4 gap-4 rounded-2xl bg-white shadow-[0_8px_25px_0_rgba(0,0,0,0.15)]'>
        <LocationSvg />
        <View className='flex-1 flex flex-col gap-2'>
          {location ? (
            <>
              <ThemedText type='defaultSemiBold'>{location?.formattedAddress?.header}</ThemedText>
              <ThemedText>{location?.formattedAddress?.detail}</ThemedText>
            </>
          ) : (
            <>
              <ThemedText type='defaultSemiBold'>We don’t have your address yet.</ThemedText>
              <ThemedText>Please allow location access in your phone settings so we can show what’s available near you.</ThemedText>
            </>
          )}
        </View>
      </View>

      <View className='overflow-hidden flex flex-row justify-center items-center p-8 gap-4 rounded-2xl bg-secondary shadow-[0_8px_25px_0_rgba(0,0,0,0.15)]'>
        <View className='flex-1 flex gap-2'>
          <ThemedText type='subtitle' className='text-white'>Darurat?</ThemedText>
          <ThemedText className='text-white'>
            Tekan dan tahan tombol ini 3 detik untuk langsung menghubungi 112.
          </ThemedText>
        </View>

        <StartCallButton />
      </View>

      <View className='flex flex-row p-4 gap-4 justify-center items-center bg-warning-accent border border-warning-default rounded-2xl'>
        <IconSymbol size={28} name="exclamationmark.triangle.fill" color={"#FAAD14"} />
        <ThemedText className='flex-1'>Gunakan hanya saat darurat. Panggilan palsu dapat dikenai sanksi.</ThemedText>
      </View>

      <ThemedText type='title' className='text-primary'>Bantuan Terdekat</ThemedText>
      <View className='flex flex-row gap-6 w-full items-start'>
        <IconCards icon={<HospitalSvg />} name="Rumah Sakit" />
        <IconCards icon={<PoliceSvg />} name="Kantor Polisi" />
        <IconCards icon={<FireStationSvg />} name="Pemadam Kebakaran" />
      </View>
    </ThemedView>
  );
}