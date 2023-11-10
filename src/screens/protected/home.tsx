import { Image } from 'expo-image';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '@app/components/Button';
import { HomeScreenProps } from '@app/navigation/types';
import { Box } from '@app/theme';

const AVATAR_SIZE = 30;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
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
