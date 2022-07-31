import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { ANDROID_CLIENT_ID } = process.env;
const { IOS_CLIENT_ID } = process.env;

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type IAuthContextData = {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
};

const AuthContext = createContext({} as IAuthContextData);

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [_, response, promptAsync] = Google.useAuthRequest({
    scopes: ["profile", "email"],
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  const userStorageKey = "@gofinances:user";

  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        const { authentication } = response;

        const result = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${authentication.accessToken}`
        );

        const userInfo = await result.json();

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };
        setUser({
          ...userLogged,
        });

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    })();
  }, [response]);

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      Alert.alert("Não foi possível conectar a conta Google.");
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const userLogged = {
          id: credential.user,
          email: credential.email!,
          name,
          photo: `https://ui-avatars.com/api/?name=${name}&length=1`,
        };
        setUser({
          ...userLogged,
        });

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;

        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
