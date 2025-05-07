import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import MyRecipe from '../screens/MyRecipe';
import HomeScreen from '../screens/HomeScreen';
import Favourite from '../screens/Favourite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
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

    return (
      <Ionicons name={iconName} size={size} color={color} />
    );
  };

  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel:false,
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarStyle: {
          // position: 'absolute',
          marginBottom: Platform.OS === 'ios' ? insets.bottom + 10 : 15,
          marginHorizontal: 8,
          paddingTop:10,
          borderRadius: 15,
          backgroundColor: 'rgb(2, 79, 107)',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarActiveTintColor: '#ee5bc4',
        tabBarInactiveTintColor: 'white',
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false, tabBarLabel: 'Home'}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="MyRecipe"
        options={{ title: "Chef's Collection"}}
        component={MyRecipe}
      />
      <Tab.Screen
        name="Favourites"
        options={{title: 'My Shortlist'}}
        component={Favourite}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
