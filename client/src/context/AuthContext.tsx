import { createContext, ReactNode, useState} from 'react';


const API_URL = 'http://10.0.2.2:5000';

//create Interface.
interface AuthContextData {
  token: string | null;
  userId: string | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

//create context.
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

//create a provider function.
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState(false);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    return true;
  };
  const signUp = async (email: string, password: string): Promise<boolean> => {
    console.log(email, password);
    return true;
  };
  const signOut = async(): Promise<void> => {};

  return (
    <AuthContext.Provider
      value={{token, userId, isLoading, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};
