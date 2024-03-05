import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const LiveEventIndicator = () => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current; // New opacity animation value

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1200),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      />
      <View style={styles.circle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "white",
  },
});

export default LiveEventIndicator;
