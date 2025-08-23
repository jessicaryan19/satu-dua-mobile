import { Pressable, View, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Illustration from "@/assets/illustration/peeking.svg"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPressable from "@/components/ThemedPressable";
import { useRouter } from "expo-router";
import { useState } from "react";
import { signInWithOtp } from "@/services/authServices";

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function redirectToSignUp() {
        router.push('/sign-up');
    }

    async function handleSignIn() {
        const { data, error } = await signInWithOtp(email);
        if (error) {
            setError("Email tidak terdaftar. Silakan daftar terlebih dahulu.");
            return;
        }
        console.log(data);
        router.push({ pathname: '/otp-verification', params: { email: email } });
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", gap: 42, padding: 20 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex justify-center items-center">
                        <Illustration width={350} />
                        <ThemedText type="title" className="text-primary w-full text-center">Selamat Datang Kembali!</ThemedText>
                        <ThemedText>Yuk lanjutkan aktivitasmu.</ThemedText>
                    </View>

                    <View className="w-full flex gap-4">
                        <View className="w-full flex gap-1">
                            <ThemedText type="defaultSemiBold">Masukkan Email Terdaftarmu</ThemedText>
                            <ThemedTextInput
                                placeholder="Email"
                                onChange={(e) => setEmail(e.nativeEvent.text)}
                                value={email}
                            />
                            {error ? <ThemedText type="danger">{error}</ThemedText> : null}
                        </View>
                    </View>

                    <ThemedPressable onPress={handleSignIn} disabled={!email}>
                        Lanjutkan
                    </ThemedPressable>

                    <View className="flex flex-row items-center justify-center gap-1">
                        <ThemedText>Belum punya akun?</ThemedText>
                        <Pressable onPress={redirectToSignUp}>
                            <ThemedText type="link" className="text-primary">Daftar</ThemedText>
                        </Pressable>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
