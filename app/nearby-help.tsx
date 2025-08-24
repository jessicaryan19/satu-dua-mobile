import FireStationSvg from "@/assets/illustration/fire-station.svg";
import HospitalSvg from "@/assets/illustration/hospital.svg";
import LocationSvg from "@/assets/illustration/location.svg";
import PoliceSvg from "@/assets/illustration/police.svg";
import ThemedPressable from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { getNearbyPlaces } from '@/services/mapServices';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';

type NearbyHelpParam = {
  name: string,
  tag: string,
}
export default function NearbyHelp() {
  const [places, setPlaces] = useState<any[]>([]);
  const { location } = useCurrentLocation()
  const router = useRouter()
  const { name, tag } = useLocalSearchParams<NearbyHelpParam>();

  const iconMap: Record<string, ReactNode> = {
    hospital: <HospitalSvg />,
    police: <PoliceSvg />,
    fire_station: <FireStationSvg />,
  }

  useEffect(() => {
    if (location?.coords) {
      const fetchHospitals = async () => {
        const data = await getNearbyPlaces(location?.coords.latitude, location?.coords.longitude, tag);
        setPlaces(data);

      };
      fetchHospitals();
    }
  }, [location?.coords.latitude, location?.coords.longitude]);

  const openGoogleMaps = (latitude: number, longitude: number, label: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&query=${encodeURIComponent(
      label
    )}`;
    Linking.openURL(url).catch(err => {
      console.error('An error occurred opening Google Maps:', err);
    });
  };

  return (
    <View className='pt-20 flex flex-col gap-4 h-full bg-white p-5'>
      <View className='flex flex-row gap-4 items-center'>
        <Pressable onPress={() => router.back()}>
          <IconSymbol size={28} name="chevron.left" color={Colors.light.tint} />
        </Pressable>
        <ThemedText type='title' className='text-primary flex-1'>{name} Terdekat</ThemedText>
      </View>

      <View className='flex flex-row p-4 gap-4 rounded-2xl bg-white shadow-[0_8px_25px_0_rgba(0,0,0,0.15)]'>
        <LocationSvg />
        <View className='flex-1 flex flex-col gap-2'>
          <ThemedText type='defaultSemiBold'>{location ? location?.formattedAddress?.header : "We don’t have your address yet."}</ThemedText>
          <ThemedText>{location ? location?.formattedAddress?.detail : "Please allow location access in your phone settings so we can show what’s available near you."}</ThemedText>
        </View>
      </View>

      <ScrollView className='h-full w-full'>
        <View className='flex flex-col gap-4'>
          {places.map((item) => (
            <View key={item.id} className='flex p-4 gap-4 rounded-2xl bg-white border border-primary'>
              <View className='flex flex-row w-full gap-2'>
                <View className='bg-accent w-16 h-16 rounded-2xl flex items-center justify-center'>
                  {iconMap[tag]}
                </View>
                <View className='flex gap-2 flex-1'>
                  <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
                  <View className='flex flex-row gap-2'>
                    <ThemedText className='bg-accent text-primary inline px-2 rounded-md' type='defaultSemiBold'>{item.distance} km</ThemedText>
                  </View>
                  <ThemedText>{item.address}</ThemedText>
                </View>
              </View>
              <View className='flex flex-row w-full gap-2'>
                <View className='flex-1'>
                  <ThemedPressable
                    onPress={() => openGoogleMaps(item.lat, item.lon, item.name)}
                    className='flex flex-row items-center justify-center gap-2'
                    type='outline'
                    icon={<IconSymbol size={16} name="arrow.up.right" color={Colors.light.tint} />}
                  >
                    Petunjuk Arah
                  </ThemedPressable>
                </View>

                <View className='flex-1'>
                  <ThemedPressable
                    className='flex flex-row items-center justify-center gap-2'
                    icon={<IconSymbol size={16} name="phone.fill" color={'#fff'} />}
                  >
                    Telepon
                  </ThemedPressable>
                </View>
              </View>
            </View>
          ))
          }
        </View>
      </ScrollView>
    </View>
  );
}
