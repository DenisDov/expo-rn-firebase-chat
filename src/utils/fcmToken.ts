import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export const sendFcmTokenToFirestore = async (userId: string) => {
  const token = await messaging().getToken();
  const timestamp = new Date().getTime();
  firestore().collection('fcmTokens').doc(userId).set({ token, timestamp });
};
