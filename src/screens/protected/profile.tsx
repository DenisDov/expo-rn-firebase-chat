import React from 'react';

import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { Box, Text } from '@app/theme';

export const ProfileScreen = () => {
  const { user, logout, loading } = useAuth();
  return (
    <Box flex={1} backgroundColor="background" padding="m" gap="m">
      <Box>
        <Text variant="title">PROTECTED HOME SCREEN</Text>
        <Text>email: {user?.email}</Text>
        <Text>providerId: {user?.providerId}</Text>
      </Box>
      <Button
        title="Logout"
        icon="exit-outline"
        onPress={logout}
        isLoading={loading}
      />
    </Box>
  );
};
