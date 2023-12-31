import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@shopify/restyle';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Box, Text, theme } from '@app/theme';

type Props = {
  onPress: () => void;
  title?: string;
  isLoading?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
};

const RIPPLE_CONFIG = {
  color: theme.colors.primaryActive,
  borderless: true,
};

export const Button = ({ onPress, title, icon, isLoading }: Props) => {
  const theme = useTheme();
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
          {
            backgroundColor: theme.colors.primary,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Box flexDirection="row" alignItems="center" gap="s">
            {icon && (
              <Ionicons name={icon} size={24} color={theme.colors.btnText} />
            )}
            {title && (
              <Text color="btnText" textTransform="capitalize" variant="btn">
                {title}
              </Text>
            )}
          </Box>
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
    paddingHorizontal: theme.spacing.s,
    height: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadii.s,
  },
});
