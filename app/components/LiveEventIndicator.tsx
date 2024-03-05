import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const LiveEventIndicator = () => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnimOuter = useRef(new Animated.Value(1)).current;
  const opacityAnimInner = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimOuter, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimInner, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1000),
        Animated.timing(opacityAnimInner, {
          toValue: .5,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim, opacityAnimOuter, opacityAnimInner]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnimOuter,
          },
        ]}
      />
      <Animated.View style={[styles.circle, { opacity: opacityAnimInner }]} />
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
