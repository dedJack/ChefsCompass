import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, ReactNode, useEffect, useState} from 'react';

interface Favourite {
  [key: string]: boolean; // Key is recipe ID, value is whether it's favorited
}

//define the context interface
export interface FavouriteContextType {
  favorite: Favourite;
  toggleFavourites: (id: string) => void;
}

// create context
export const FavouriteContext = createContext<FavouriteContextType>(
  {} as FavouriteContextType,
);

export const FavouriteProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<Favourite>({});

  //favorites fetched wehenever the user loads the App.
  useEffect(()=>{
    const loadFavorite = async()=>{
        try {
          const savedFavorites = await AsyncStorage.getItem('uerFavorites');
          if(savedFavorites){
            setFavorite(JSON.parse(savedFavorites));
          }         
          
        } catch (e) {
            console.log('Failed to load favorites : ',e);
            
        }
    }
    loadFavorite();
  },[])

  //saves favorites to the AsyncStorage.
  useEffect(()=>{
    const savedFavorites = async()=>{
        try {
            await AsyncStorage.setItem('uerFavorites',JSON.stringify(favorite));
        } catch (e) {
            console.log('Failed to save recipe.',e)
        }
    }
    savedFavorites();
  },[favorite]);
  //toggleFavourites to add recipe in favourite list.
  const toggleFavourites = (id: string) => {
    setFavorite(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <FavouriteContext.Provider value={{favorite, toggleFavourites}}>
      {children}
    </FavouriteContext.Provider>
  );
};
