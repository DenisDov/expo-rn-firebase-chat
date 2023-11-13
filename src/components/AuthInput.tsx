import { useTheme } from '@shopify/restyle';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { theme } from '@app/theme';

type AuthInputProps = {
  onBlur: () => void;
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
} & TextInputProps;

export const AuthInput = ({
  onBlur,
  onChangeText,
  value,
  placeholder,
  ...props
}: AuthInputProps) => {
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
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'GeistRegular',
    height: theme.spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadii.s,
    paddingHorizontal: theme.spacing.s,
  },
});
