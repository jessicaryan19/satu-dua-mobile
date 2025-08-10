import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps, View } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedPhoneInputProps = TextInputProps & {
    className?: string;
}
export default function ThemedPhoneInput({
    className,
    ...rest
}: ThemedPhoneInputProps) {
    return (
        <View className={`flex-row items-center border border-darkGrey-border rounded-2xl ${className}`}>
            <View className="px-3 border-r border-darkGrey-border">
                <ThemedText type="default">🇮🇩 +62</ThemedText>
            </View>
            <TextInput
                keyboardType="phone-pad"
                className="flex-1 p-3 ps-2 placeholder:text-darkGrey-label font-nunito rounded-2xl focus:outline-none"
                {...rest}
            />
        </View>
    )
}