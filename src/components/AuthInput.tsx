import { useTheme } from '@shopify/restyle';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { theme } from '@app/theme';

type Props = {
  onBlur: () => void;
  onChangeText: () => void;
  value: string;
  placeholder: string;
};

export const AuthInput = ({
  onBlur,
  onChangeText,
  value,
  placeholder,
}: Props) => {
  const theme = useTheme();
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.text}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCorrect={false}
      style={[styles.input, { color: theme.colors.text }]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'GeistSans',
    height: theme.spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadii.s,
    paddingHorizontal: theme.spacing.s,
  },
});
