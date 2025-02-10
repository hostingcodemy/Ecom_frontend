import React, { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {

  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const [favorites, setFavorites] = useState(loadFavoritesFromLocalStorage());

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.item_cd === item.item_cd);
      if (isFavorite) {

        const newFavorites = prevFavorites.filter((fav) => fav.item_cd !== item.item_cd);

        if (newFavorites.length === 0) {
          localStorage.removeItem("favorites");
        }

        return newFavorites;
      } else {

        const updatedFavorites = [...prevFavorites, item];

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        return updatedFavorites;
      }
    });
  };

  
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

