import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MyRecipe from '../screens/MyRecipe';
import HomeScreen from '../screens/HomeScreen';
import Favourite from '../screens/Favourite';
import Ionicons from 'react-native-vector-icons/Ionicons';
export type BottomTabScreenTypeProp = {
  MyRecipe: undefined;
  HomeScreen: undefined;
  Favourites: undefined;
};

const Tab = createBottomTabNavigator<BottomTabScreenTypeProp>();
const TabNavigation: React.FC = () => {
  //fucntion for Bottom tab icon
  const getTabBarIcon = (
    routeName: string,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName: string;

    if (routeName === 'HomeScreen') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (routeName === 'MyRecipe') {
      iconName = focused ? 'book' : 'book-outline';
    } else if (routeName === 'Favourites') {
      iconName = focused ? 'heart' : 'heart-outline';
    } else {
      iconName = 'help-circle-outline'; // fallback icon
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarStyle: {
          marginBottom: 20,
          marginHorizontal: 10,
          borderRadius: 15,
          paddingTop: 15,
          backgroundColor: 'rgb(2, 79, 107)',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          elevation: 5,
        },
        tabBarActiveTintColor:'#ee5bc4',
        tabBarInactiveTintColor:'white'
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false, tabBarLabel: 'blue'}}
        component={HomeScreen}
      />
      <Tab.Screen name="MyRecipe" component={MyRecipe} />
      <Tab.Screen name="Favourites" component={Favourite} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
