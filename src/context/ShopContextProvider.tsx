import React, { useState } from "react";
import { ShopContext } from "./ShopContext"; // Import the context

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  // Function to count cart items
  const getCartCount = () => Object.keys(cartItems).length;

  // Function to toggle search visibility
  const setShowSearch = (show: boolean) => console.log("Search visibility:", show);

  return (
    <ShopContext.Provider value={{ token, setToken, getCartCount, setShowSearch, setCartItems }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
