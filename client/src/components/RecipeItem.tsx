import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Recipe} from '../context/RecipeContext';
import {FavouriteContext} from '../context/FavouriteContext';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface recipeItemProp {
  recipe: Recipe;
  onPressRecipeItem?: () => void;
  currentUserId?: string | null;
  deleteSingleRecipe?: () => void;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard';

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
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPressRecipeItem}
      activeOpacity={0.9}>
      <View style={styles.cardContent}>
        {/* Title with subtle decoration */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Description with elegant styling */}
        <Text style={styles.description}>{recipe.description}</Text>

        {/* Difficulty with modern badge */}
        <View
          style={[
            styles.difficultyContainer,
            {backgroundColor: getDifficultyColor(recipe.difficulty)},
          ]}>
          <Text style={styles.difficulty}>{recipe.difficulty}</Text>
        </View>
      </View>

      {/* Right-aligned action buttons */}
      <View style={styles.actionsColumn}>
        {/* Favorites button with smooth transition */}
        {currentUserId && recipe.createdBy !== currentUserId && (
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.iconButton}>
            <View
              style={[
                styles.iconWrapper,
                favorite[recipe._id] && styles.favoriteActive,
              ]}>
              {favorite[recipe._id] ? (
                <Ionicons style={styles.favoriteIcon} name={'heart'} color={'red'} />
              ) : (
                <Ionicons style={styles.favoriteIcon} name={'heart-outline'} color={'black'} />
              )}
            </View>
          </TouchableOpacity>
        )}

        {/* Delete button with warning style */}
        {currentUserId && recipe.createdBy === currentUserId && (
          <TouchableOpacity
            onPress={deleteSingleRecipe}
            style={styles.iconButton}>
            <View style={[styles.iconWrapper, styles.deleteWrapper]}>
              <Ionicons style={styles.deleteIcon} name={'trash'} color={'black'} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardContent: {
    flex: 1,
    paddingRight: 12,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  titleUnderline: {
    height: 2,
    width: 24,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  difficultyContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  difficulty: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  actionsColumn: {
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 4,
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    width: 35,
    height: 35,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  favoriteActive: {
    backgroundColor: '#FFF0F0',
  },
  deleteWrapper: {
    backgroundColor: '#FFF0F0',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  deleteIcon: {
    fontSize: 25,
  },
});

// Helper function for difficulty colors
const getDifficultyColor = (difficulty: Difficulty | string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return '#4CAF50';
    case 'medium':
      return '#FF9800';
    case 'hard':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
};

export default RecipeItem;
