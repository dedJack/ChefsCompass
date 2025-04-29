import {createContext, ReactNode, useState} from 'react';

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
}

export const RecipeContext = createContext<RecepieContextData>(
  {} as RecepieContextData,
);

export const RecipeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const createRecipe = async (
    recipe: Omit<Recipe, '_id' | 'createdAt' | 'createdBy'>,
  ) => {
    console.log(recipe, 'from recipe Context');
  };

  return (
    <RecipeContext.Provider value={{recipes, createRecipe}}>
      {children}
    </RecipeContext.Provider>
  );
};
