import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface Beer {
  id: string;
  name: string;
}

interface FavouritesContextProps {
  favouritesList: Beer[];
  toggleFavourite: (beer: Beer) => void;
}

const FavouritesContext = createContext<FavouritesContextProps | undefined>(
  undefined
);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({
  children,
}) => {
  const [favouritesList, setFavouritesList] = useState<Beer[]>([]);
  const LOCAL_STORAGE_KEY = "favouritesList";
  //make sure getItem is not reset on initial render
  const isMounted = useRef(false);

  // Load favourites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavourites = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedFavourites) {
        setFavouritesList(JSON.parse(storedFavourites));
      } 
    } catch (error) {
      console.error("Error loading favourites from localStorage:", error);
    }
  }, []);

  // Save favourites to localStorage whenever favouritesList changes
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favouritesList));
    } else {
      isMounted.current = true;
    }
  }, [favouritesList]);

  //TODO - change beer.name check to beer.id 
  const toggleFavourite = (beer: Beer) => {
    const isAlreadyFavourite = favouritesList.some((b) => b.id === beer.id);

    if (isAlreadyFavourite) {
      setFavouritesList((prevList) => prevList.filter((b) => b.id !== beer.id));
    } else {
      setFavouritesList((prevList) => [...prevList, beer]);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favouritesList, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextProps => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }

  return context;
};
