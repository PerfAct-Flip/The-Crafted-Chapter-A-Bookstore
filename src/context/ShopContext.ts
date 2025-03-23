import { createContext } from "react";

// Define the type for context data
interface ShopContextType {
  token: string;
  setToken: (token: string) => void;
  getCartCount: () => number;
  setShowSearch: (show: boolean) => void;
  setCartItems: (items: Record<string, number>) => void;
}

// Create the context with a default value of `null`
export const ShopContext = createContext<ShopContextType | null>(null);
