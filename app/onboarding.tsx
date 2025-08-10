import { useRef, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { ThemedText } from "@/components/ThemedText";
import ThemedPressable from "@/components/ThemedPressable";
import Onboarding1 from "@/assets/illustration/onboarding-1.svg";
import Onboarding2 from "@/assets/illustration/onboarding-2.svg";
import OnboardingBG from "@/assets/illustration/onboarding-bg.svg";
import { router } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const PAGES = [
    {
        title: "Bantuan Darurat di Ujung Jari",
        description:
            "Dalam satu sentuhan, Anda terhubung dengan tim 112 yang siap menolong, kapan pun Anda butuh.",
        image: <Onboarding1 width={350} height={300} />,
    },
    {
        title: "Tetap Tenang, Pelajari Apa yang Harus Dilakukan",
        description:
            "Pelajari langkah tepat agar Anda siap melindungi diri dan orang tercinta saat darurat.",
        image: <Onboarding2 width={350} height={300} />,
    },
];

export default function OnboardingScreen() {
    const pagerRef = useRef<PagerView>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const offset = useSharedValue(0);

    function handleNext() {
        if (pageIndex < PAGES.length - 1) {
            pagerRef.current?.setPage(pageIndex + 1);
        } else {
            router.replace("/sign-in");
        }
    };

    const bgStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value * -width * 0.5}],
    }))

    return (
        <View className="flex h-full w-full justify-center bg-white">
            <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0 }, bgStyle]}>
                <OnboardingBG width={width * 2} style={{ marginLeft: -10 }}/>
            </Animated.View>

            <PagerView
                ref={pagerRef}
                style={{ flex: 0.8 }}
                initialPage={0}
                onPageScroll={(e) => { offset.value = e.nativeEvent.position + e.nativeEvent.offset }}
                onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
            >
                {PAGES.map((page, index) => (
                    <View key={index} className="flex justify-center items-center gap-4 p-[22px]">
                        {page.image}
                        <ThemedText type="title" className="text-primary w-full text-center">{page.title}</ThemedText>
                        <ThemedText className="w-full text-center">{page.description}</ThemedText>
                    </View>
                ))}
            </PagerView>

            <View className="flex flex-row gap-2 w-full justify-center items-center">
                {PAGES.map((page, index) => (
                    <View key={index} className={`w-[10px] h-[10px] rounded-full ${pageIndex === index ? "bg-primary" : "bg-accent"}`} />
                ))}
            </View>

            <View className="p-[22px]">
                <ThemedPressable onPress={handleNext}>
                    Selanjutya
                </ThemedPressable>
            </View>
        </View>
    );
}
