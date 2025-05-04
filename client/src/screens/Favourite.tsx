// FavoritesScreen.js
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

  const favoriteRecipes = recipes.filter(recipe => favorite[recipe._id]);
  const userRecipes = recipes.filter(
    recipeItem => userId !== recipeItem.createdBy,
  );

  return (
    <View style={{flex: 1}}>
      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          renderItem={({item}) => (
            <RecipeItem
              recipe={item}
              onPressRecipeItem={() =>
                navigation.navigate('RecipeDetail', {recipeId: item._id})
              }
              // currentUserId={currentUserId}
              // deleteSingleRecipe={() => handleDeleteRecipe(item._id)}
            />
          )}
        //   keyExtractor={item => item._id}
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
