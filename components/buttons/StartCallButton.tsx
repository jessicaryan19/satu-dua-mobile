import React, { useRef } from "react";
import { Pressable, Animated, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

export default function StartCallButton() {
  const scale = useRef(new Animated.Value(1)).current;
  const holdTimeout = useRef<number | null>(null);

  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const scale3 = useRef(new Animated.Value(0)).current;

  const startPulse = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(scale1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scale2, {
          toValue: 1,
          duration: 3000,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scale3, {
          toValue: 1,
          duration: 3500,
          delay: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scale3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    holdTimeout.current = setTimeout(() => {
      // TODO: start call here
      console.log('udh 3 detik')
    }, 3000)
  };

  const stopPulse = () => {
    scale.stopAnimation();
    scale.setValue(1)
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
  }

  const getStyle = (animatedValue: Animated.Value) => ({
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 3],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 0],
    }),
  });

  return (
    <View className="items-center justify-center">
      <Animated.View
        className="absolute w-24 h-24 rounded-full bg-white"
        style={getStyle(scale1)}
      />
      <Animated.View
        className="absolute w-24 h-24 rounded-full bg-white"
        style={getStyle(scale2)}
      />
      <Animated.View
        className="absolute w-24 h-24 rounded-full bg-white"
        style={getStyle(scale3)}
      />

      <Pressable
        className="w-24 h-24 rounded-full bg-white items-center justify-center active:scale-105"
        onPressIn={startPulse}
        onPressOut={stopPulse}
      >
        <IconSymbol size={42} name="phone.fill" color={"#D90000"} />
      </Pressable>
    </View>
  );
}
