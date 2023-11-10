import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function useLoadedAssets() {
  const [loaded, error] = useFonts({
    GeistRegular: require('../assets/fonts/Geist-Regular.otf'),
    GeistBold: require('../assets/fonts/Geist-Bold.otf'),
    GeistSemiBold: require('../assets/fonts/Geist-SemiBold.otf'),
    ...Ionicons.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return loaded;
}
