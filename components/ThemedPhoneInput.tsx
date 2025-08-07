import { TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedPhoneInputProps = {
    placeholder?: string;
    className?: string;
}
export default function ThemedPhoneInput({
    placeholder,
    className,
}: ThemedPhoneInputProps) {
    return (
        <View className={`flex-row items-center border border-darkGrey-border rounded-2xl ${className}`}>
            <View className="px-3 border-r border-darkGrey-border">
                <ThemedText type="default">🇮🇩 +62</ThemedText>
            </View>
            <TextInput
                keyboardType="phone-pad"
                placeholder={placeholder}
                className="flex-1 p-3 ps-2 placeholder:text-darkGrey-label font-nunito rounded-2xl focus:outline-none"
            />
        </View>
    )
}