import { useAuth } from '@app/context/auth';
import { Box, Text } from '@app/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Pressable } from 'react-native';
import { SignInScreenProps } from '@app/navigation/types';
import { useForm, Controller } from 'react-hook-form';
import { AuthInput } from '@app/components/AuthInput';
import { Button } from '@app/components/Button';

const authSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// login
export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { loading, signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    signIn(data.email, data.password);
  };

  return (
    <Box flex={1} padding="m" backgroundColor="background">
      <Box gap="m">
        <Text variant="title" textAlign="center">
          Welcome back
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
                placeholder="password"
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
          <Button
            title="SIGN IN"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
        </Box>

        <Box flexDirection="row" justifyContent="center">
          <Text>Don't have an account? </Text>
          <Pressable
            hitSlop={16}
            onPress={() => navigation.navigate('SignUp')}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            <Text textDecorationLine="underline" color="primary">
              Sign up
            </Text>
          </Pressable>
        </Box>

        <Pressable
          hitSlop={16}
          onPress={() => console.log('FORGOT')}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}>
          <Text
            textDecorationLine="underline"
            color="primary"
            textAlign="center">
            Forgot password?
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
