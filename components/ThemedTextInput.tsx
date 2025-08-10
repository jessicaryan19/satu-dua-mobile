import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps &{
    className?: string;
}
export default function ThemedTextInput({
    className,
    ...rest
}: ThemedTextInputProps) {
    return (
        <TextInput
            className={`flex p-3 border border-darkGrey-border rounded-2xl placeholder:text-darkGrey-label font-nunito ${className}`}
            {...rest}
        />
    )
}