import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Recipe} from '../context/RecipeContext';
import {FavouriteContext} from '../context/FavouriteContext';

interface recipeItemProp {
  recipe: Recipe;
  onPressRecipeItem?: () => void;
  currentUserId?: string | null;
  deleteSingleRecipe?: () => void;
}
const RecipeItem: React.FC<recipeItemProp> = ({
  recipe,
  onPressRecipeItem,
  currentUserId,
  deleteSingleRecipe,
}) => {
  // const [favorite, setFavorite] = useState(false);
  const {toggleFavourites, favorite} = useContext(FavouriteContext);

  const handleFavoritePress = () => {
    toggleFavourites(recipe._id);
    // setFavorite(!favorite)
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPressRecipeItem}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficulty}>{recipe.difficulty}</Text>
        </View>
      </View>

      {/* Show favourites to the user */}
      {currentUserId && recipe.createdBy !== currentUserId && (
        <TouchableOpacity onPress={handleFavoritePress}>
          {favorite[recipe._id] ? (
            <Text style={[styles.favourites,{fontSize:17}]}>❤️</Text>
          ) : (
            <Text style={styles.favourites}>♡</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Show delete btn to recipe owner */}
      {currentUserId && recipe.createdBy === currentUserId && (
        <TouchableOpacity style={styles.btn} onPress={deleteSingleRecipe}>
          <View style={styles.dltBtn}>
            <Text style={styles.dltText}>🗑</Text>
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: 'lightgrey',
    borderRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 4,
  },
  cardContent: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'maroon',
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    paddingRight: 35,
    color: '#333',
  },
  difficultyContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficulty: {
    fontSize: 12,
    color: '#555',
  },
  btn: {
    alignItems: 'center',
  },
  dltBtn: {
    backgroundColor: 'rgba(2, 22, 48, 0.97)',
    padding: 10,
    position: 'absolute',
    borderRadius: 35,
    marginRight: 30,
  },
  dltText: {
    color: 'white',
    fontSize: 25,
  },
  favourites: {
    position: 'absolute',
    right: 10,
    fontSize: 25,
  },
});

export default RecipeItem;
