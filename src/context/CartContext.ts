import { createContext } from "react";

interface CartContextType {
  cartItems: Record<string, number>;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: (silent?: boolean) => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);