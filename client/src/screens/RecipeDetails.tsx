import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
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
    <ScrollView contentContainerStyle={[styles.container,{marginBottom:30}]}>
      {/* {recipeDetails.imageUrl ? (
      <Image
        source={require('../assests/chickenBiryani.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />
      ) : null} */}

      <Text style={styles.title}>{recipeDetails.title}</Text>

      <View style={styles.headerContainer}>
        <Text style={styles.subTitle}>
          Difficulty: {recipeDetails.difficulty}
        </Text>
        {/* Show favourites to the user */}
        {userId && recipeDetails.createdBy !== userId && (
          <TouchableOpacity onPress={handleFavoritePress} style={styles.fvt}>
            {favorite[recipeDetails._id] ? (
              <Text style={[{fontSize: 20}]}>❤️</Text>
            ) : (
              <Text style={[{fontSize: 28}]}>♡</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.paragraph}>{recipeDetails.description}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {/* {recipeDetails.ingredients?.map((item, index) => ( */}
      <Text style={styles.listItem}>{recipeDetails.ingredients}</Text>
      {/* // ))} */}

      <Text style={styles.sectionTitle}>Steps</Text>
      {/* {recipeDetails.steps?.map((step, index) => ( */}
      <Text style={styles.listItem}>{recipeDetails.steps}</Text>
      {/* // ))} */}

      <Text style={[{fontSize:20,fontWeight:"bold", marginVertical:10, textAlign:"center"}]}>Enjoy the meal!👍</Text>
      <Text style={[{fontSize:20,fontWeight:"bold", marginVertical:10, textAlign:"center"}]}></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    top: 50,
    padding: 20,
    marginBottom:40,
    backgroundColor: '#fff',
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
    textAlign: 'center',
    marginBottom: 16,
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
  fvt: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default RecipeDetails;
