import { TextInput } from "react-native";

export type ThemedTextInputProps = {
    placeholder?: string;
    className?: string;
}
export default function ThemedTextInput({
    placeholder,
    className,
}: ThemedTextInputProps) {
    return (
        <TextInput
            placeholder={placeholder}
            className={`flex p-3 border border-darkGrey-border rounded-2xl placeholder:text-darkGrey-label font-nunito ${className}`}
        />
    )
}