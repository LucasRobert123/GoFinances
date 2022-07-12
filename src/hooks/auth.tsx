import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const { ANDROID_CLIENT_ID } = process.env;
const { IOS_CLIENT_ID } = process.env;

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Alert } from "react-native";

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
};

const AuthContext = createContext({} as IAuthContextData);

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [_, response, promptAsync] = Google.useAuthRequest({
    scopes: ["profile", "email"],
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        const { authentication } = response;

        const result = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${authentication.accessToken}`
        );

        const userInfo = await result.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
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
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
