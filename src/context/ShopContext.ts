import { createContext } from "react";

export interface Book {
  id: string;
  _id?: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  genres: string[];
}

// Define the type for context data
interface ShopContextType {
  token: string | null;
  setToken: (token: string) => void;
  setShowSearch: (show: boolean) => void;
  products: Book[];
  setProducts: (products: Book[]) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

// Create the context with a default value of `null`
export const ShopContext = createContext<ShopContextType | null>(null);
