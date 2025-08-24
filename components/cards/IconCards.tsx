import { Pressable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ReactNode } from "react";
import { useRouter } from "expo-router";

type IconCardProps = {
    icon: ReactNode,
    name: string,
    tag: string,
    disabled?: boolean
}

export default function IconCards({
    icon,
    name,
    tag,
    disabled = false
}: IconCardProps) {
    const router = useRouter()
    const handlePress = () => {
        router.push({ pathname: '/nearby-help', params: { name: name, tag: tag } })
    }
    return (
        <Pressable className='flex justify-center items-center w-1/5 gap-2' onPress={handlePress} disabled={disabled}>
            <View className='bg-accent w-16 h-16 rounded-2xl flex items-center justify-center'>
                {icon}
            </View>
            <ThemedText type='defaultSemiBold' className='text-wrap text-center'>{name}</ThemedText>
        </Pressable>
    )
}