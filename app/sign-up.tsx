import { View, Text, TextInput, Button, Pressable } from "react-native";
import Illustration from "@/assets/illustration/hello.svg"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPhoneInput from "@/components/ThemedPhoneInput";
import ThemedPressable from "@/components/ThemedPressable";

export default function SignInScreen() {
    return (
        <ThemedView className="flex justify-center items-center h-full gap-7">
            <View className="flex justify-center items-center">
                <Illustration width={250} height={250} />
                <ThemedText type="title" className="text-primary">Selamat Datang di SatuDua</ThemedText>
                <ThemedText >Buat akunmu agar kami dapat segera melayanimu.</ThemedText>
            </View>

            <View className="w-full flex gap-4">
                <View className="w-full">
                    <ThemedText type="defaultSemiBold">Siapa Nama Lengkapmu?</ThemedText>
                    <ThemedTextInput placeholder="Nama Lengkap" />
                </View>

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
                    Sudah punya akun?
                </ThemedText>
                <ThemedText type="link" className="text-primary">
                    Masuk
                </ThemedText>
            </View>
        </ThemedView>
    )
}