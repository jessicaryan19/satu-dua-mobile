import { View } from "react-native";
import Illustration from "@/assets/illustration/security.svg"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedPressable from "@/components/ThemedPressable";
import { OtpInput } from "react-native-otp-entry";

export default function OTPVerificationScreen() {
    return (
        <ThemedView className="flex justify-center items-center h-full gap-7">
            <View className="flex justify-center items-center">
                <Illustration width={350} height={250} />
                <ThemedText>
                    Kami telah mengirimkan One-Time Password (OTP) ke +62 81245678910. Silakan masukkan OTP untuk memverifikasi identitas Anda.
                </ThemedText>
            </View>

            <OtpInput numberOfDigits={6} focusColor={"#172090"}/>

            <View className="flex flex-row items-center justify-center gap-1">
                <ThemedText type="defaultSemiBold">
                    Kirim Ulang
                </ThemedText>
                <ThemedText>
                    00:00
                </ThemedText>
            </View>

            <ThemedPressable>
                Lanjutkan
            </ThemedPressable>
        </ThemedView>
    )
}