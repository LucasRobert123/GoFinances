import { createContext, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: "4444",
    name: "Lucas",
    email: "lucas@gmail.com",
  };

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID =
        "772465763841-u945bo4lubsgbbg30b6gfb544e78esso.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@lucasrobert123/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({
        authUrl,
        returnUrl: REDIRECT_URI,
      }).catch(console.log);
      console.log({ response });
    } catch (error) {
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
