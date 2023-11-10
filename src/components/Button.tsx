import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Text, theme } from '@app/theme';

type Props = {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
};

const RIPPLE_CONFIG = {
  color: theme.colors.primaryActive,
  borderless: true,
};

export const Button = ({ onPress, title, isLoading }: Props) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };
  return (
    <Shadow
      startColor={theme.colors.shadow}
      offset={[2, 2]}
      distance={2}
      style={styles.shadow}>
      <Pressable
        onPress={handlePress}
        disabled={isLoading}
        hitSlop={16}
        android_ripple={RIPPLE_CONFIG}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1 },
        ]}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text color="btnText">{title}</Text>
        )}
      </Pressable>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  shadow: {
    alignSelf: 'stretch',
    borderRadius: theme.borderRadii.s,
  },
  button: {
    height: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadii.s,
  },
});
