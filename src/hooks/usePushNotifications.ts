import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

export function usePushNotifications() {
  useEffect(() => {
    const registerAppWithFCM = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('token: ', token);
    };

    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

          if (enabled) {
            console.log('Authorization status:', authStatus);
          }
        } else if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'This app needs permission to receive notifications.',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('never_ask_again');
          } else {
            console.log('Notification permission denied');
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    requestNotificationPermission();
    registerAppWithFCM();

    return unsubscribe;
  }, []);
}
