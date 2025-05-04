import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MyRecipe from '../screens/MyRecipe';
import HomeScreen from '../screens/HomeScreen';

export type BottomTabScreenTypeProp = {
  MyRecipe: undefined;
  HomeScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabScreenTypeProp>();
const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
    }}
      >
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="MyRecipe"
        component={MyRecipe}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
