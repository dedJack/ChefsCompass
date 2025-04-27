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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSingup = async () => {
    if (email && password) {
      const success = await signUp(email, password);
      if (success) {
        setEmail('');
        setPassword('');
        //Do something.
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
      <Text style={styles.header}>Sign Up</Text>
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
      <TouchableOpacity style={styles.btn} onPress={handleSingup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account. Login</Text>
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
export default SignupScreen;
