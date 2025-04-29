import axios from 'axios';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {API_URL, AuthContext} from './AuthContext';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdBy: string;
  createdAt: string;
}

interface RecepieContextData {
  recipes: Recipe[];
  createRecipe: (
    recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => Promise<void>;
  fetchRecipe:()=>Promise<void>;
  // fetchRecipeById:()=>Promise<void>;
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
      if(result.data.success){
        setRecipes(result.data.fetchRecipe);
      }
    } catch (e) {
      console.error(e);
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
    <RecipeContext.Provider value={{recipes, createRecipe, fetchRecipe}}>
      {children}
    </RecipeContext.Provider>
  );
};
