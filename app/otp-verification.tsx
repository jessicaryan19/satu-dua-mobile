import { Pressable, View, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Illustration from "@/assets/illustration/security.svg"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedPressable from "@/components/ThemedPressable";
import { OtpInput } from "react-native-otp-entry";
import { useState } from "react";
import { signInWithOtp, signUpWithOtp, verifyOtp } from "@/services/authServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCountdown } from "@/hooks/useCountdown";
import { AuthUserData } from "@/types/auth";

export default function OTPVerificationScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const { formattedTime, isActive, resetCountdown } = useCountdown(120);
    const { email, phone, name } = useLocalSearchParams<AuthUserData>();

    async function handleOtpVerification() {
        const { data, error } = await verifyOtp(email, otp);
        if (error) {
            setError("OTP tidak valid atau kedaluwarsa. Silakan coba lagi.");
            return;
        }
        console.log(data)
        router.push('/(tabs)');
    }

    async function handleResendOtp() {
        if (phone && name) {
            const { error } = await signUpWithOtp(email, phone, name);
            if (error) {
                console.error("Error resending OTP:", error);
                return;
            }
        } else {
            const { error } = await signInWithOtp(email);
            if (error) {
                console.error("Error resending OTP:", error);
                return;
            }
        }
        setOtp("");
        resetCountdown();
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", gap: 28, padding: 20 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex justify-center items-center">
                        <Illustration width={350} height={250} />
                        <ThemedText>
                            Kami telah mengirimkan One-Time Password (OTP) ke
                            <ThemedText type="defaultSemiBold"> {email.toLowerCase()}</ThemedText>
                            . Silakan masukkan OTP untuk memverifikasi identitas Anda.
                        </ThemedText>
                    </View>

                    <View className="w-full flex gap-2">
                        <OtpInput
                            onTextChange={(value) => setOtp(value)}
                            numberOfDigits={6}
                            focusColor={"#172090"}
                        />
                        {error ? <ThemedText type="danger">{error}</ThemedText> : null}
                    </View>

                    <View className="flex flex-row items-center justify-center gap-1">
                        <Pressable onPress={handleResendOtp} disabled={isActive}>
                            {isActive ?
                                <ThemedText>Kirim ulang OTP dalam {formattedTime}</ThemedText> :
                                <ThemedText type="defaultSemiBold">Kirim Ulang</ThemedText>}
                        </Pressable>
                    </View>

                    <ThemedPressable onPress={handleOtpVerification} disabled={otp.length < 6}>
                        Lanjutkan
                    </ThemedPressable>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
