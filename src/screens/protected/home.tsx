import { Image } from 'expo-image';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { HomeScreenProps } from '@app/navigation/types';
import { Box } from '@app/theme';

const AVATAR_SIZE = 30;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useAuth();

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
            source={user?.photoURL}
            placeholder="https://picsum.photos/seed/696/60/60"
            contentFit="contain"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user?.photoURL]);

  return (
    <Box
      flex={1}
      backgroundColor="background"
      padding="m"
      justifyContent="center">
      <Button
        title="chat"
        icon="chatbox-outline"
        onPress={() => navigation.navigate('Chat')}
      />
    </Box>
  );
};
