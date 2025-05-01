import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Recipe, RecipeContext} from '../context/RecipeContext';
import {RouteProp} from '@react-navigation/native';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';

type RecipeDetailRouteType = RouteProp<RootStackScreenTypeProp, 'RecipeDetail'>;

interface RecipeDetailScreenProp {
  route: RecipeDetailRouteType;
}

const RecipeDetails: React.FC<RecipeDetailScreenProp> = ({route}) => {
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const {recipeId} = route.params;
  const {fetchSingleRecipe} = useContext(RecipeContext);

  //useEffect async fucntion so that card detail renders and save the data in the state.
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await fetchSingleRecipe(recipeId);
        setRecipeDetails(fetchedRecipe);
      } catch (e) {
        console.log('Failed to fetch recipe ', e);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text
          style={[
            {
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 10,
            },
          ]}>
          {recipeDetails?.title}
        </Text>
        <Text>{recipeDetails?.description}</Text>
        <Text>{recipeDetails?.difficulty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    padding: 15,
    margin: 15,
    borderColor: 'black',
  },
  innerContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 15,   
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
  }
});

export default RecipeDetails;
