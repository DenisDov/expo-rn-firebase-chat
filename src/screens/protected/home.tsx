import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { Box, Text } from '@app/theme';

export const HomeScreen = () => {
  const { user, logout, loading } = useAuth();
  return (
    <Box flex={1} backgroundColor="background" padding="m">
      <Text variant="title">PROTECTED HOME SCREEN</Text>
      <Text>email: {user?.email}</Text>
      <Text>providerId: {user?.providerId}</Text>

      <Button
        title="Logout"
        onPress={logout}
        isLoading={loading}
        icon="exit-outline"
      />
    </Box>
  );
};
