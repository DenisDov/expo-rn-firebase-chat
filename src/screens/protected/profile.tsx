import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';

import { Button } from '@app/components/Button';
import { ProgressBar } from '@app/components/ProgressBar';
import { useAuth } from '@app/context/auth';
import { Box, Text } from '@app/theme';

export const ProfileScreen = () => {
  const { user, logout, loading } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickImageAndUpload = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // create bucket storage reference to not yet existing image
      const storageRef = storage().ref('avatars/' + user?.uid);
      // path to existing file on filesystem
      const pathToFile = result.assets[0].uri;
      // uploads file
      const task = storageRef.putFile(pathToFile);

      // track upload progress
      task.on('state_changed', taskSnapshot => {
        const progress =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      // update user avatar
      task.then(async () => {
        console.log('Image uploaded to the bucket!');

        const downloadURL = await storage()
          .ref('avatars/' + user?.uid)
          .getDownloadURL();

        await auth().currentUser!.updateProfile({
          photoURL: downloadURL,
        });
      });
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
          source={user?.photoURL}
          contentFit="contain"
          transition={300}
        />

        <Button title="Change avatar" onPress={pickImageAndUpload} />
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Box marginVertical="m">
            <ProgressBar progress={uploadProgress} />
            <Text>{uploadProgress.toFixed() + '%'}</Text>
          </Box>
        )}
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
