import { Image } from 'expo-image';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { HomeScreenProps } from '@app/navigation/types';
import { Box, Text } from '@app/theme';

const AVATAR_SIZE = 30;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user, logout, loading } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              borderRadius: AVATAR_SIZE / 2,
            }}
            source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
            transition={1000}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

      <Button
        title="chat"
        icon="chatbox-outline"
        onPress={() => navigation.navigate('Chat')}
      />
    </Box>
  );
};
