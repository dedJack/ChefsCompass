import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RecepieDetails from '../screens/RecepieDetails';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

export type RootStackScreenTypeProp = {
  Login: undefined;
  Signup: undefined;
  HomeScreen: undefined;
  RecepieDetail: {recepieId: string};
};

const Stack = createNativeStackNavigator<RootStackScreenTypeProp>();
type RootNavigationProp = NativeStackNavigationProp<RootStackScreenTypeProp>;

const RootNavigation: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  // console.log(isAuthenticated, isLoading ,": ISloading");

  // Checks whether user Aunthenticated or not, And then send them to correct screen.
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }
  }, [isAuthenticated, isLoading]); //checks whenever the value changes.

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        options={{headerShown: false}}
        component={SignupScreen}
      />
      <Stack.Screen
        name="RecepieDetail"
        options={{headerShown: false}}
        component={RecepieDetails}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
