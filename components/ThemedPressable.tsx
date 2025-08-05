import { Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedPressableProps = {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
};

export default function ThemedPressable({
    children,
    className,
    onPress,
    ...rest
}: ThemedPressableProps) {
    return (
        <Pressable className={`bg-primary rounded-2xl w-full p-3 ${className}`} onPress={onPress} {...rest}>
            <ThemedText type="defaultSemiBold" className="text-white text-center">{children}</ThemedText>
        </Pressable>
    )
}