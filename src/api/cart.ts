import api from "./axios";

export const getCart = () => api.get("/cart");

export const addToCartApi = (data: { productId: string; quantity?: number }) =>
    api.post("/cart", data);

export const removeFromCartApi = (productId: string) =>
    api.delete(`/cart/${productId}`);

export const clearCartApi = () => api.post("/cart/clear");
