import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {API_URL} from '@env';

//create Interface.
interface AuthContextData {
  token: string | null;
  userId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  getUser: () => Promise<boolean>;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //store token and userId to AsyncStorage
  const checkAuth = async (): Promise<boolean> => {
    try {
      const getStoredToken = await AsyncStorage.getItem('token');
      const getStoredUserId = await AsyncStorage.getItem('userId');

      if (getStoredToken && getStoredUserId) {
        setToken(getStoredToken);
        setUserId(getStoredUserId);
        setIsAuthenticated(true);
        return true;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return false;
  };

  //Run checkAuth once everytime the screen refresh
  useEffect(() => {
    checkAuth();
  }, []);

  //register
  const signUp = async (
    username: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const result = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      if (result.status) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        console.error('Error Details ', e.response?.data);
      }
      return false;
    }
  };

  //login
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      const {token, userId, success} = result.data;
      console.log(token);
      if (success) {
        //save token and userid to asyncStorage.
        await AsyncStorage.setItem('token', token);
        setToken(token);
        await AsyncStorage.setItem('userId', userId);
        setUserId(userId);
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        console.error('Error Details ', e.response?.data);
      }
      return false;
    }
  };

  //logout
  const signOut = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      setToken(null);
      setUserId(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.log(e);
    }
  };

  //validate token
  const getUser = async (): Promise<boolean> => {
    try {
      const validToken = await axios.get(`${API_URL}/api/auth/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (validToken.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('Token expired, login again! ', e);
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isLoading,
        isAuthenticated,
        signIn,
        signOut,
        signUp,
        getUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
