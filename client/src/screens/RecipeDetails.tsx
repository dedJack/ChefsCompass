import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Recipe, RecipeContext} from '../context/RecipeContext';
import {RouteProp} from '@react-navigation/native';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';
import {AuthContext} from '../context/AuthContext';
import {FavouriteContext} from '../context/FavouriteContext';

type RecipeDetailRouteType = RouteProp<RootStackScreenTypeProp, 'RecipeDetail'>;

interface RecipeDetailScreenProp {
  route: RecipeDetailRouteType;
}

const RecipeDetails: React.FC<RecipeDetailScreenProp> = ({route}) => {
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const {recipeId} = route.params;
  const {fetchSingleRecipe} = useContext(RecipeContext);
  const {userId} = useContext(AuthContext);
  const {favorite, toggleFavourites} = useContext(FavouriteContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await fetchSingleRecipe(recipeId);
        setRecipeDetails(fetchedRecipe);
        console.log('Recipe details ', fetchRecipe);
      } catch (e) {
        console.log('Failed to fetch recipe ', e);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipeDetails) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handleFavoritePress = () => {
    toggleFavourites(recipeDetails._id);
  };

  return (
    <ScrollView contentContainerStyle={{padding: 16, paddingBottom: 60,top: StatusBar.currentHeight,
    }}>
      <View style={styles.card}>
        <Text style={styles.title}>{recipeDetails.title}</Text>

        <View style={styles.headerContainer}>
          <Text style={styles.subTitle}>
            Difficulty: {recipeDetails.difficulty}
          </Text>
          {userId && recipeDetails.createdBy !== userId && (
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favorite}>
              {favorite[recipeDetails._id] ? (
                <Text style={{fontSize: 20}}>❤️</Text>
              ) : (
                <Text style={{fontSize: 28}}>♡</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.paragraph}>{recipeDetails.description}</Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.listItem}>{recipeDetails.ingredients}</Text>

        <Text style={styles.sectionTitle}>Steps</Text>
        <Text style={styles.listItem}>{recipeDetails.steps}</Text>

        <Text style={styles.footer}>Enjoy the meal! 👍</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom:15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  footer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 8,
    marginBottom: 6,
  },
  favorite: {
    justifyContent: 'center',
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default RecipeDetails;
