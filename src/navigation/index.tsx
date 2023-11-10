import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import { useAuth } from '@app/context/auth';
import { useLoadedAssets } from '@app/hooks/useLoadedAssets';
import { HomeScreen } from '@app/screens/protected/home';
import { SignInScreen } from '@app/screens/public/sign_in';
import { SignUpScreen } from '@app/screens/public/sign_up';

import { ProtectedStackParamList, PublicStackParamList } from './types';

const ProtectedStack = createNativeStackNavigator<ProtectedStackParamList>();
const PublicStack = createNativeStackNavigator<PublicStackParamList>();

function RootNavigator() {
  const { user } = useAuth();

  return user?.uid ? (
    <ProtectedStack.Navigator>
      <ProtectedStack.Screen name="Home" component={HomeScreen} />
    </ProtectedStack.Navigator>
  ) : (
    <PublicStack.Navigator>
      <PublicStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
      <PublicStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
    </PublicStack.Navigator>
  );
}

export default function Navigation({ theme }) {
  const loaded = useLoadedAssets();

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer theme={theme} onReady={onLayoutRootView}>
      <RootNavigator />
    </NavigationContainer>
  );
}
