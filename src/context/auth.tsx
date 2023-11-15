import auth from '@react-native-firebase/auth';
import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Alert } from 'react-native';

interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  providerId: string;
  createdAt: string;
  lastLoginAt: string;
  email: string;
}

interface ContextInterface {
  loading: boolean;
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const userInitialState = {
  uid: '',
  createdAt: '',
  displayName: '',
  lastLoginAt: '',
  photoURL: '',
  providerId: '',
  email: '',
};

const contextInitialState: ContextInterface = {
  loading: false,
  user: userInitialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  logout: () => {},
};

type Action =
  | { type: 'LOADING_START' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' };

const authReducer = (
  state: Pick<ContextInterface, 'loading' | 'user'>,
  action: Action,
) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

// create context
const AuthContext = React.createContext<ContextInterface>(contextInitialState);

// This hook can be used to access the user info.
export function useAuth(): ContextInterface {
  const context = React.useContext<ContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a Provider');
  }

  return context;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, dispatch] = useReducer(authReducer, contextInitialState);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const dataWeCareAbout: User = {
          uid: user.uid,
          displayName: user.providerData[0].displayName ?? '',
          photoURL:
            user.providerData[0].photoURL ?? 'https://picsum.photos/200',
          providerId: user.providerData[0].providerId,
          email: user.providerData[0].email ?? '',
          createdAt: user.metadata.creationTime!,
          lastLoginAt: user.metadata.lastSignInTime!,
        };
        dispatch({ type: 'SET_USER', payload: dataWeCareAbout });
      } else {
        // User is signed out
        dispatch({ type: 'LOGOUT' });
      }
      setInitialLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOADING_START' });
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err: any) {
      Alert.alert(err.message);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOADING_START' });
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      Alert.alert(err.message);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: 'LOADING_START' });
      await auth().signOut();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const value = {
    loading: authState.loading,
    user: authState.user,
    signUp, // register
    signIn, // login
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
