import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import { getCart, addToCartApi, removeFromCartApi, clearCartApi } from "../api/cart";
import { ShopContext } from "./ShopContext";
import { toast } from "react-toastify";

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shopContext = useContext(ShopContext);
  const token = shopContext?.token;

  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  // Helper to convert backend cart to frontend format
  const updateLocalCart = (items: any[]) => {
    const formatted: Record<string, number> = {};
    items.forEach((item) => {
      const productId = typeof item.product === "string" ? item.product : (item.product.id || item.product._id);
      formatted[productId] = item.quantity;
    });
    setCartItems(formatted);
  };

  // Fetch cart when token changes
  useEffect(() => {
    if (token) {
      const fetchCart = async () => {
        try {
          const res = await getCart();
          updateLocalCart(res.data.items);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      };
      fetchCart();
    } else {
      setCartItems({}); // Clear if no token
    }
  }, [token]);

  const addToCart = async (productId: string) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      const res = await addToCartApi({ productId, quantity: 1 });
      updateLocalCart(res.data.items);
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token) return;
    try {
      const res = await removeFromCartApi(productId);
      updateLocalCart(res.data.items);
    } catch (error) {
      toast.error("Failed to remove from cart");
    }
  };

  const clearCart = async (silent: boolean = false) => {
    if (!token) return;
    try {
      await clearCartApi();
    } catch (error) {
      if (!silent) {
        toast.error("Failed to clear cart");
      }
      console.error("Clear cart error:", error);
    } finally {
      // Always clear local state to stay in sync with backend's auto-clear on order
      setCartItems({});
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
