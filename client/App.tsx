/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {RecipeProvider} from './src/context/RecipeContext';
import {FavouriteProvider} from './src/context/FavouriteContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RecipeProvider>
        <FavouriteProvider>
          <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
          </SafeAreaProvider>
        </FavouriteProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
