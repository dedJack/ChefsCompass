import React, {useContext} from 'react';
import {View, FlatList, Text} from 'react-native';
import {FavouriteContext} from '../context/FavouriteContext';
import {RecipeContext} from '../context/RecipeContext';
import RecipeItem from '../components/RecipeItem';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabScreenTypeProp} from '../navigation/TabNavigation';
import {AuthContext} from '../context/AuthContext';

type FavoriteScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackScreenTypeProp, 'RecipeDetail'>,
  BottomTabNavigationProp<BottomTabScreenTypeProp>
>;

type FavoriteScreenProp = {
  navigation: FavoriteScreenNavigationProp;
};

const FavoritesScreen: React.FC<FavoriteScreenProp> = ({navigation}) => {
  const {favorite} = useContext(FavouriteContext);
  const {recipes} = useContext(RecipeContext);
  const {userId} = useContext(AuthContext);

  const filteredFavorites = recipes.filter(
    recipe =>
      favorite[recipe._id] && // user marked it as favorite
      recipe.createdBy !== userId // but the user didn't create it
  );
  
  return (
    <View style={{flex: 1}}>
      {filteredFavorites.length > 0 ? (
        <FlatList
          data={filteredFavorites}
          renderItem={({item}) => (
            <RecipeItem
              recipe={item}
              onPressRecipeItem={() =>
                navigation.navigate('RecipeDetail', {recipeId: item._id})
              }
              />
          )}
          contentContainerStyle={{paddingBottom: 20}} // Add some bottom padding
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No favorites yet. Add some recipes to your favorites!
        </Text>
      )}
    </View>
  );
};

export default FavoritesScreen;
