import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {Alert, Button, Text, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackScreenTypeProp } from '../navigation/RootNavigation';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackScreenTypeProp,'HomeScreen'>;

interface HomeScreenProp {
  navigation: HomeScreenNavigationProp
}
const HomeScreen: React.FC<HomeScreenProp> = ({navigation}) => {

  const {token, userId, signOut} = useContext(AuthContext);

  const handleLogout=()=>{
    Alert.alert('Logout',"Do you want to logout",[
      {
        text:'Cancle', style:'cancel',
      },
      {
        text:'logout', onPress: async()=>{
          await signOut();
          navigation.navigate('Login');
        }
      }
    ])
  }
  return (
    <View>
      <Text>Home Screen</Text>
      <Text>{userId}</Text>
      <Text>{token}</Text>
      <Button title="Logout" onPress={handleLogout}/>
    </View>
  );
};

export default HomeScreen;
