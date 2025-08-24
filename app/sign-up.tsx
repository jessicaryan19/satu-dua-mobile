import { Pressable, View } from "react-native";
import Illustration from "@/assets/illustration/hello.svg"
import { ThemedText } from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPhoneInput from "@/components/ThemedPhoneInput";
import ThemedPressable from "@/components/ThemedPressable";
import { useRouter } from "expo-router";
import { useState } from "react";
import { signUpWithOtp } from "@/services/authServices";
import KeyboardSafeView from "@/components/KeyboardSafeView";

export default function SignUpScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    function redirectToSignIn() {
        router.push('/sign-in');
    }

    async function handleSignUp() {
        const phoneFormatted = '+62' + phone;
        const emailFormatted = email.toLowerCase();
        const nameFormatted = name.trim().toUpperCase();

        const { error } = await signUpWithOtp(emailFormatted, phoneFormatted, nameFormatted);
        if (error) {
            console.error("Error signing up:", error);
            return;
        }
        router.push({ pathname: '/otp-verification', params: { email: emailFormatted, phone: phoneFormatted, name: nameFormatted } });
    }

    return (
        <KeyboardSafeView>
            <View className="flex justify-center items-center">
                <Illustration width={200} height={200} />
                <ThemedText type="title" className="text-primary w-full text-center">Selamat Datang di Satudua!</ThemedText>
                <ThemedText>Buat akunmu agar kami dapat segera melayanimu.</ThemedText>
            </View>

            <View className="w-full flex gap-4">
                <View className="w-full flex gap-1">
                    <ThemedText type="defaultSemiBold">Siapa Nama Lengkapmu?</ThemedText>
                    <ThemedTextInput
                        placeholder="Nama Lengkap"
                        onChange={(e) => setName(e.nativeEvent.text)}
                        value={name}
                    />
                </View>

                <View className="w-full flex gap-1">
                    <ThemedText type="defaultSemiBold">Masukkan Email Aktifmu</ThemedText>
                    <ThemedTextInput
                        placeholder="Email"
                        onChange={(e) => setEmail(e.nativeEvent.text)}
                        value={email}
                    />
                </View>

                <View className="w-full flex gap-1">
                    <ThemedText type="defaultSemiBold">Masukkan Nomor Telepon Aktif</ThemedText>
                    <ThemedPhoneInput
                        placeholder="Nomor Telepon"
                        onChange={(e) => setPhone(e.nativeEvent.text)}
                        value={phone}
                    />
                </View>
            </View>

            <View className="w-full flex gap-4">
                <ThemedPressable onPress={handleSignUp} disabled={!name || !email || !phone}>
                    Lanjutkan
                </ThemedPressable>

                <View className="flex flex-row items-center justify-center gap-1">
                    <ThemedText>Sudah punya akun?</ThemedText>
                    <Pressable onPress={redirectToSignIn}>
                        <ThemedText type="link" className="text-primary">Masuk</ThemedText>
                    </Pressable>
                </View>
            </View>
        </KeyboardSafeView>
    )
}
