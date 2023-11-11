import auth from '@react-native-firebase/auth';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';

import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { Box, Text } from '@app/theme';

export const ProfileScreen = () => {
  const { user, logout, loading } = useAuth();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const update = {
        photoURL: uri,
      };

      try {
        await auth().currentUser!.updateProfile(update);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <Box flex={1} backgroundColor="background" padding="m">
      <Box>
        <Text variant="title">PROTECTED PAGE</Text>
        <Text>email: {user?.email}</Text>
        <Text>providerId: {user?.providerId}</Text>
      </Box>

      <Box flex={1}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={user?.photoURL || 'https://reactnative.dev/img/tiny_logo.png'}
          contentFit="contain"
        />

        <Button title="pick image" onPress={pickImage} />
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
