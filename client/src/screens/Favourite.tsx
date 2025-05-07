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
  const context = useContext(FavouriteContext);
  if(!context){
    throw new Error('FavouriteContext is not available');
  }
  const {favorite} = context;
  const {recipes} = useContext(RecipeContext);
  const {userId} = useContext(AuthContext);


  
  return (
    <View style={{flex: 1}}>
      {favorite.length > 0 ? (
        <FlatList
          data={favorite}
          renderItem={({item})=>{
            const recipe = recipes.find(r => r._id===item.recipeId)
            if(!recipe){
              return null;
            }
            return(
              <RecipeItem recipe={recipe}
              onPressRecipeItem={()=>navigation.navigate('RecipeDetail',{recipeId:item.recipeId})}/>
            )
          }}
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
