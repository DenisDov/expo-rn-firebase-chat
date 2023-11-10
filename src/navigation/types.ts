import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProtectedStackParamList = {
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type PublicStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  'SignIn'
>;

export type SignUpScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  'SignUp'
>;

export type HomeScreenProps = NativeStackScreenProps<
  ProtectedStackParamList,
  'Home'
>;
