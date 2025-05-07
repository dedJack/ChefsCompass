import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';
import {AuthContext, AuthProvider} from '../context/AuthContext';

export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackScreenTypeProp,
  'Signup'
>;

interface SignupScreenProp {
  navigation: SignupScreenNavigationProp;
}
const SignupScreen: React.FC<SignupScreenProp> = ({navigation}) => {
  const {signUp} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSingup = async () => {
    if (username && email && password) {
      const success = await signUp(username, email, password);
      if (success) {
        //Do something.
        navigation.navigate('Login');

        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Sign up failed, Please try again.');
      }
    } else {
      Alert.alert('Invalid credentials, enter both email and password');
      setEmail('');
      setPassword('');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign up</Text>
          <View style={styles.titleUnderline} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor={'black'}
          keyboardType="default"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={'black'}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn} onPress={handleSingup}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account. Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:"rgb(2, 79, 107)",
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15, // Adds vertical spacing for better content padding
    backgroundColor: '#fff', // Ensures shadow is visible (required on iOS)
    borderRadius: 20,
    shadowColor: 'rgba(13, 14, 14, 0.97)', // Slightly softer shadow tone
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5, // iOS-specific shadow blur
    elevation: 10, // Android shadow
  },
  headerContainer: {
    marginBottom: 8,
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  titleUnderline: {
    height: 2,
    width: 65,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  input: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.9,
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
    backgroundColor: 'rgb(2, 79, 107)',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  linkText: {
    marginVertical: 8,
    fontSize: 15,
    color: 'blue',
  },
});
export default SignupScreen;
