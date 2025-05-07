import {API_URL} from '@env';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import axios from 'axios';

interface Favourite {
  recipeId: string;
}

// const API_URL='http://10.0.2.2:5000'
// Define the context interface
export interface FavouriteContextType {
  favorite: Favourite[];
  toggleFavourite: (id: string) => void;
  isFavourite: (recipeId: string) => boolean;
}

// Create context
export const FavouriteContext = createContext<FavouriteContextType | null>(
  null,
);

export const FavouriteProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<Favourite[]>([]);
  const {userId, token} = useContext(AuthContext);

  //Add favourites
  const toggleFavourite = async (id: string) => {
    try {
      //check for existing favourites
      const isAlreadyFavourite = favorite.some(item => item.recipeId === id);
      if (isAlreadyFavourite) {
        //remove from favourites
        const deleteFavourite = await axios.delete(
          `${API_URL}/api/favourite/delete-favourite/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (deleteFavourite.data.success) {
          console.log('favourite removed');
          setFavorite(favorite.filter(item => item.recipeId !== id)); //remove from local storage
        }
      } else {
        //add favourites to DB.
        const result = await axios.post(
          `${API_URL}/api/favourite/add-favourite`,
          {
            userId: userId,
            recipeId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (result.data.success) {
          console.log('favourite Added');
          setFavorite(prev => [...prev, {recipeId: id}]); //Add to local state.
        }
      }
      return true;
    } catch (e) {
      console.error('Failed to sync favorite: ', e);
      return false;
    }
  };

  //Get all favourites from DB when screen refreshs.
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const result = await axios.get(`${API_URL}/api/favourite/get-favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.data.data) {
          const favouriteList = result.data.data.map((fav: any) => ({
            recipeId: fav.recipeId,
          }));
          setFavorite(favouriteList);
        }
        return true;
      } catch (e) {
        console.error('failed to fetch recipes: ', e);
        return false;
      }
    };
    if(token){
      loadFavourites();

    }
  }, [token]);

  // Check if a recipe is in the favorite list
  const isFavourite = (recipeId: string) => {
    return favorite.some(item => item.recipeId === recipeId);
  };

  return (
    <FavouriteContext.Provider value={{favorite, toggleFavourite, isFavourite}}>
      {children}
    </FavouriteContext.Provider>
  );
};
