/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {RecipeProvider} from './src/context/RecipeContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RecipeProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
