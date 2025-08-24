import { Pressable, PressableProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { ReactNode } from "react";

export type ThemedPressableProps = PressableProps & {
    children: React.ReactNode;
    className?: string;
    type?: string;
    icon?: ReactNode
};

export default function ThemedPressable({
    className,
    children,
    type = 'default',
    icon,
    ...rest
}: ThemedPressableProps) {
    return (
        <>
            {
                type === 'default' ? (
                    < Pressable
                        className={`rounded-2xl w-full p-3 active:bg-primary/90 ${className} ${rest.disabled ? "bg-disabled" : "bg-primary"}`} {...rest}>
                        {icon}
                        <ThemedText type="defaultSemiBold" className="text-white text-center">{children}</ThemedText>
                    </Pressable >
                ) : (
                    < Pressable
                        className={`rounded-2xl w-full p-3 bg-white border border-primary ${className}`} {...rest}>
                        {icon}
                        <ThemedText type="defaultSemiBold" className="text-primary text-center">{children}</ThemedText>
                    </Pressable >
                )
            }
        </>

    )
}