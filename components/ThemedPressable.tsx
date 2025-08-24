import { Pressable, PressableProps } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedPressableProps = PressableProps & {
    children: React.ReactNode;
    className?: string;
};

export default function ThemedPressable({
    className,
    children,
    ...rest
}: ThemedPressableProps) {
    return (
        <Pressable
            className={`rounded-2xl w-full p-3 active:bg-primary/90 ${className} ${rest.disabled ? "bg-disabled" : "bg-primary"}`} {...rest}>
            <ThemedText type="defaultSemiBold" className="text-white text-center">{children}</ThemedText>
        </Pressable>
    )
}