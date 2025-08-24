import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import LocationSvg from "@/assets/illustration/location.svg"
import FireStationSvg from "@/assets/illustration/fire-station.svg"
import HospitalSvg from "@/assets/illustration/hospital.svg"
import PoliceSvg from "@/assets/illustration/police.svg"
import IconCards from '@/components/cards/IconCards';
import StartCallButton from '@/components/buttons/StartCallButton';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import FireSvg from "@/assets/illustration/fire.svg"
import CPRSvg from "@/assets/illustration/cpr.svg"
import EarthquakeSvg from "@/assets/illustration/earthquake.svg"
import FloodSvg from "@/assets/illustration/flood.svg"

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export default function HomeScreen() {
  const { session } = useAuth();
  const { location } = useCurrentLocation();

  return (
    <ThemedView className='pt-20 flex flex-col gap-3.5 h-full'>
      <ThemedText type='title' className='text-primary'>Halo, {toTitleCase(session?.user.user_metadata.display_name)}</ThemedText>

      <View className='flex flex-row p-4 gap-4 rounded-2xl bg-white shadow-[0_8px_25px_0_rgba(0,0,0,0.15)]'>
        <LocationSvg />
        <View className='flex-1 flex flex-col gap-2'>
          <ThemedText type='defaultSemiBold'>{location ? location?.formattedAddress?.header : "We don’t have your address yet."}</ThemedText>
          <ThemedText>{location ? location?.formattedAddress?.detail : "Please allow location access in your phone settings so we can show what’s available near you."}</ThemedText>
        </View>
      </View>

      <View className='overflow-hidden flex flex-row justify-center items-center p-8 gap-4 rounded-2xl bg-secondary shadow-[0_8px_25px_0_rgba(0,0,0,0.15)]'>
        <View className='flex-1 flex gap-2'>
          <ThemedText type='subtitle' className='text-white'>Darurat?</ThemedText>
          <ThemedText className='text-white'>
            Tekan dan tahan tombol ini <ThemedText type='defaultSemiBold'>3 detik</ThemedText> untuk langsung menghubungi <ThemedText type='defaultSemiBold'>112</ThemedText>.
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
        <IconCards icon={<HospitalSvg />} name="Rumah Sakit" tag='hospital' />
        <IconCards icon={<PoliceSvg />} name="Kantor Polisi" tag='police' />
        <IconCards icon={<FireStationSvg />} name="Pemadam Kebakaran" tag='fire_station' />
      </View>

      <ThemedText type='title' className='text-primary'>Edukasi</ThemedText>
      <View className='flex flex-row gap-6 w-full items-start'>
        <IconCards icon={<FloodSvg />} name="Banjir" tag='hospital' disabled={true} />
        <IconCards icon={<FireSvg />} name="Kebakaran" tag='police' disabled={true} />
        <IconCards icon={<CPRSvg />} name="CPR" tag='fire_station' disabled={true} />
        <IconCards icon={<EarthquakeSvg />} name="Gempa" tag='fire_station' disabled={true} />
      </View>
    </ThemedView>
  );
}