import React, { useRef, useEffect } from "react";
import { Animated, Dimensions, Easing } from "react-native";

export default function FadeInView(props) {
  let { width } = Dimensions.get("window"); // TO GET THE SIZE OF THE WINDOW
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const pan = useRef(new Animated.ValueXY({ x: width, y: 0 })).current;

  useEffect(() => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      easing: Easing.ease,
      delay: props.delay,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    /* Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(); */
    /* Animated.sequence([
      Animated.delay(props.delay),
      Animated.spring(pan, { toValue: { x: 0, y: 0 } }),
    ]).start(); */
  }, [pan]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        /* opacity: fadeAnim, */
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
    >
      {props.children}
    </Animated.View>
  );
}
