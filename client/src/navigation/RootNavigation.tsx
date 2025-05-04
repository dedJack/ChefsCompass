import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetails from '../screens/RecipeDetails';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import TabNavigation from './TabNavigation';

export type RootStackScreenTypeProp = {
  Login: undefined;
  Signup: undefined;
  TabNavigator: undefined;
  RecipeDetail: {recipeId: string};
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
          routes: [{name: 'TabNavigator'}],
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
        name="RecipeDetail"
        options={{headerShown: false}}
        component={RecipeDetails}
      />
      <Stack.Screen
        name="TabNavigator"
        options={{headerShown: false}}
        component={TabNavigation}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
