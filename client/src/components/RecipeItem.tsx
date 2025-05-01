import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Recipe} from '../context/RecipeContext';

interface recipeItemProp {
  recipe: Recipe;
  onPressRecipeItem: ()=>void
}
const RecipeItem: React.FC<recipeItemProp> = ({recipe, onPressRecipeItem}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressRecipeItem}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <Text style={styles.difficulty}>{recipe.difficulty}</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <View style={styles.dltBtn}>
          <Text style={styles.dltText}>🗑</Text>
        </View>
      </TouchableOpacity>
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
    color: '#333',
  },
  difficulty: {
    fontSize: 14,
    color: '#666',
  },
  btn: {
    alignItems: 'center',
  },
  dltBtn: {
    backgroundColor: 'rgba(2, 22, 48, 0.97)',
    padding: 10,
    borderRadius: 35,
  },
  dltText: {
    color: 'white',
    fontSize: 25,
  },
});

export default RecipeItem;
