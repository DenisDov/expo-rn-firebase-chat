import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export const ProgressBar = ({ progress }: { progress: number }) => {
  const animatedProgress = useDerivedValue(() =>
    withTiming(progress, { duration: 500 }),
  );

  const style = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#027aff',
  },
});

export default ProgressBar;
