import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';

import { Button } from '@app/components/Button';
import { useAuth } from '@app/context/auth';
import { Box, Text } from '@app/theme';

export const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const { user, logout, loading } = useAuth();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Box flex={1} backgroundColor="background" padding="m">
      <Box flex={1} justifyContent="space-between">
        <Box>
          <Text variant="title">PROTECTED PAGE</Text>
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
    </Box>
  );
};
