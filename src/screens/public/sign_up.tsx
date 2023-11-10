import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AuthInput } from '@app/components/AuthInput';
import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { SignUpScreenProps } from '@app/navigation/types';
import { Box, Text } from '@app/theme';

const authSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

// create account
export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const { loading, signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = data => {
    signUp(data.email, data.password);
  };

  return (
    <Box flex={1} padding="m" backgroundColor="background">
      <Box gap="m">
        <Text variant="title" textAlign="center">
          Create account
        </Text>

        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthInput
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text color="error">{errors.email?.message}</Text>}
        </Box>

        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthInput
                placeholder="create password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text color="error">{errors.password?.message}</Text>
          )}
        </Box>

        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthInput
                placeholder="confirm password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text color="error">{errors.confirmPassword?.message}</Text>
          )}
        </Box>

        <Box>
          <Button
            title="SIGN UP"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
};
