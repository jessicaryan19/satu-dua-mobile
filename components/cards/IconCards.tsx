import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ReactNode } from "react";

type IconCardProps = {
    icon: ReactNode,
    name: string
}
export default function IconCards({
    icon,
    name
}: IconCardProps) {
    return (
        <View className='flex justify-center items-center w-1/5 gap-2'>
            <View className='bg-accent w-16 h-16 rounded-2xl flex items-center justify-center'>
                {icon}
            </View>
            <ThemedText type='defaultSemiBold' className='text-wrap text-center'>{name}</ThemedText>
        </View>
    )
}