import { View } from "react-native";
import Illustration from "@/assets/illustration/peeking.svg"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPhoneInput from "@/components/ThemedPhoneInput";
import ThemedPressable from "@/components/ThemedPressable";

export default function SignInScreen() {
    return (
        <ThemedView className="flex justify-center items-center h-full gap-7">
            <View className="flex justify-center items-center">
                <Illustration width={350} />
                <ThemedText type="title" className="text-primary">Selamat Datang Kembali!</ThemedText>
                <ThemedText >Yuk lanjutkan aktivitasmu.</ThemedText>
            </View>

            <View className="w-full flex gap-4">
                <View className="w-full">
                    <ThemedText type="defaultSemiBold">Masukkan Nomor Telepon Aktif Kamu</ThemedText>
                    <ThemedPhoneInput placeholder="Nomor Telepon" />
                </View>
            </View>

            <ThemedPressable>
                Lanjutkan
            </ThemedPressable>

            <View className="flex flex-row items-center justify-center gap-1">
                <ThemedText>
                    Belum punya akun?
                </ThemedText>
                <ThemedText type="link" className="text-primary">
                    Daftar Sekarang
                </ThemedText>
            </View>
        </ThemedView>
    )
}