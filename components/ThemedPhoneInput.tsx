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
        <View>
            <View className="absolute left-3 top-3">
                <ThemedText type="default" className="border-r pr-3 border-darkGrey-border">
                    🇮🇩 +62
                </ThemedText>
            </View>
            <TextInput
                keyboardType="phone-pad"
                placeholder={placeholder}
                className={`flex p-3 ps-20 border border-darkGrey-border rounded-2xl placeholder:text-darkGrey-label font-nunito ${className}`}
            />
        </View>
    )
}