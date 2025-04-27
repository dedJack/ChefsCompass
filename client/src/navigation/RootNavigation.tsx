import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RecepieDetails from '../screens/RecepieDetails';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackScreenTypeProp = {
  Login: undefined;
  Signup:undefined;
  HomeScreen:undefined;
  RecepieDetail:{recepieId:string};
};

const Stack = createNativeStackNavigator<RootStackScreenTypeProp>();

const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
      <Stack.Screen name="Signup" options={{headerShown: false}} component={SignupScreen} />
      <Stack.Screen name="RecepieDetail" options={{headerShown: false}} component={RecepieDetails} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
