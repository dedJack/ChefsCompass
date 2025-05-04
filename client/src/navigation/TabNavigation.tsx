import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MyRecipe from '../screens/MyRecipe';
import HomeScreen from '../screens/HomeScreen';
import Favourite from '../screens/Favourite';

export type BottomTabScreenTypeProp = {
  MyRecipe: undefined;
  HomeScreen: undefined;
  Favourite:undefined;
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
      <Tab.Screen
        name="Favourite"
        component={Favourite}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
