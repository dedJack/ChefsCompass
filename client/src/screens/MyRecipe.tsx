import React, { useContext } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecipeItem from '../components/RecipeItem';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabScreenTypeProp} from '../navigation/TabNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';
import { AuthContext } from '../context/AuthContext';
import { RecipeContext } from '../context/RecipeContext';

type MyRecipeNavigateProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackScreenTypeProp, 'RecipeDetail'>,
  BottomTabNavigationProp<BottomTabScreenTypeProp>
>;

interface MyRecipeProp {
    navigation:MyRecipeNavigateProp
}
const MyRecipe:React.FC<MyRecipeProp> = ({navigation}) => {

    const {userId} = useContext(AuthContext);
    const {recipes,handleSingleRecipeDelete} = useContext(RecipeContext);

    const userRecipes = recipes.filter(recipeItem=> userId===recipeItem.createdBy)

  return (
    <View>

        <FlatList
          data={userRecipes}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item}) => (
            <RecipeItem
              recipe={item}
              onPressRecipeItem={() =>
                navigation.navigate('RecipeDetail', {recipeId: item._id})
              }
              currentUserId={userId}
              deleteSingleRecipe={() => handleSingleRecipeDelete(item._id)}
            />
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    mainText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
}) 

export default MyRecipe;
