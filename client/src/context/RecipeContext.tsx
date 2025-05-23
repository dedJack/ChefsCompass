import axios from 'axios';
import {createContext, ReactNode, useContext, useState} from 'react';
import { AuthContext} from './AuthContext';
import { API_URL } from '@env';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients:string;
  steps:string;
  createdBy: string;
  createdAt: string;
}

interface RecepieContextData {
  recipes: Recipe[];
  createRecipe: (
    recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => Promise<void>;
  fetchRecipe: () => Promise<void>;
  fetchSingleRecipe: (id: string) => Promise<Recipe | null>;
  handleSingleRecipeDelete: (id: string) => Promise<void>;
}

export const RecipeContext = createContext<RecepieContextData>(
  {} as RecepieContextData,
);

export const RecipeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const {token} = useContext(AuthContext);

  //create new recipe except ('_id','createdAt,'createdBy').
  const createRecipe = async (
    recipe: Omit<Recipe, '_id' | 'createdAt' | 'createdBy'>,
  ) => {
    try {
      const result = await axios.post(
        `${API_URL}/api/recipe/create-recipes`,
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(result.data)
      if (result.data.success) {
        const newRecipe = result.data.data;
        setRecipes(prevRecipe => [...prevRecipe, newRecipe]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //fetch all recipe
  const fetchRecipe = async () => {
    try {
      const result = await axios.get(`${API_URL}/api/recipe/get-recipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setRecipes(result.data.fetchRecipe);
      } else {
        console.log('No recipes found.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  //fetch recipe detail by id.
  const fetchSingleRecipe = async (id: string): Promise<Recipe | null> => {
    try {
      const result = await axios.get(
        `${API_URL}/api/recipe/get-recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data.success) {
        console.log("fetch single recipe :",result.data)
        return result.data.data;
      }
      return null;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  //fetch and delete recipe by Id.
  const handleSingleRecipeDelete = async (id: string): Promise<void> => {
    try {
      const result = await axios.delete(
        `${API_URL}/api/recipe/get-recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data.success) {
        const updatedRecipes = recipes.filter(
          recipe => recipe._id.toString() !== id.toString(),
        );
        // console.log(updatedRecipes);
        setRecipes(updatedRecipes);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  //fetch all recipes created by single user profile.
  // const fetchRecipeById=async()=>{
  //   try {
  //     const result = await axios.get(`${API_URL}/api/recipe/get-recipes-id`,{
  //       headers:{
  //         Authorization:`Bearer ${token}`,
  //       },
  //     });
  //     console.log('Get all recipe by this ID : ',result.data);
  //   } catch (e) {
  //     console.error(e);

  //   }
  // }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        createRecipe,
        fetchRecipe,
        fetchSingleRecipe,
        handleSingleRecipeDelete,
      }}>
      {children}
    </RecipeContext.Provider>
  );
};
