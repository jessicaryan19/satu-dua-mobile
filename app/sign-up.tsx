import { Pressable, View } from "react-native";
import Illustration from "@/assets/illustration/hello.svg"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPhoneInput from "@/components/ThemedPhoneInput";
import ThemedPressable from "@/components/ThemedPressable";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
    const router = useRouter();

    function redirectToSignIn() {
        router.push('/sign-in');
    }

    function handleSignUp() {
        router.push('/otp-verification');
    }
    return (
        <ThemedView className="flex justify-center items-center h-full gap-7">
            <View className="flex justify-center items-center">
                <Illustration width={250} height={250} />
                <ThemedText type="title" className="text-primary">Selamat Datang di SatuDua</ThemedText>
                <ThemedText >Buat akunmu agar kami dapat segera melayanimu.</ThemedText>
            </View>

            <View className="w-full flex gap-4">
                <View className="w-full flex gap-1">
                    <ThemedText type="defaultSemiBold">Siapa Nama Lengkapmu?</ThemedText>
                    <ThemedTextInput placeholder="Nama Lengkap" />
                </View>

                <View className="w-full flex gap-1">
                    <ThemedText type="defaultSemiBold">Masukkan Nomor Telepon Aktif Kamu</ThemedText>
                    <ThemedPhoneInput placeholder="Nomor Telepon" />
                </View>
            </View>

            <ThemedPressable onPress={handleSignUp}>
                Lanjutkan
            </ThemedPressable>

            <View className="flex flex-row items-center justify-center gap-1">
                <ThemedText>
                    Sudah punya akun?
                </ThemedText>
                <Pressable onPress={redirectToSignIn}>
                    <ThemedText type="link" className="text-primary">
                        Masuk
                    </ThemedText>
                </Pressable>
            </View>
        </ThemedView>
    )
}