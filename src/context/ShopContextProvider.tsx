import React, { useState, useEffect } from "react";
import { ShopContext, Book } from "./ShopContext";
import { getProducts } from "../api/productApi";
import { useAuth } from "./AuthContext";

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, login } = useAuth();
  const [products, setProducts] = useState<Book[]>([]);

  // Adapter for login -> setToken compatibility
  const setToken = (t: string) => login(t);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Map _id from backend to id for frontend compatibility
        const formattedProducts = data.map((item: any) => ({
          ...item,
          id: item.id || item._id
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Function to toggle search visibility
  const setShowSearch = (show: boolean) => console.log("Search visibility:", show);

  return (
    <ShopContext.Provider value={{ token, setToken, setShowSearch, products, setProducts }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
