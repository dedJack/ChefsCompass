import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';
import {AuthContext} from '../context/AuthContext';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabScreenTypeProp} from '../navigation/TabNavigation';

export type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackScreenTypeProp, 'Login'>,
  BottomTabNavigationProp<BottomTabScreenTypeProp>
>;

interface loginScreenProp {
  navigation: LoginScreenNavigationProp;
}
const LoginScreen: React.FC<loginScreenProp> = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      const success = await signIn(email, password);
      if (success) {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Login failed, Please try again.');
      }
    } else {
      Alert.alert('Invalid credentials, enter both email and password');
      setEmail('');
      setPassword('');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account. Sign Up</Text>
      </TouchableOpacity>

      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  btn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 7,
    backgroundColor: 'lightblue',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  linkText: {
    marginVertical: 8,
    fontSize: 15,
    color: 'blue',
  },
});
export default LoginScreen;
