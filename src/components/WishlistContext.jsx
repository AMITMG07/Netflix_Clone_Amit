import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (movie) => {
    if (!wishlist.find((m) => m.slug === movie.slug)) {
      setWishlist([...wishlist, movie]);
    }
  };

  const removeFromWishlist = (slug) => {
    setWishlist(wishlist.filter((m) => m.slug !== slug));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
