import api from "./axios";

export const createOrder = (data: { shippingAddress: string }) =>
    api.post("/orders", data);

export const getMyOrders = () => api.get("/orders");

export const getOrderById = (id: string) => api.get(`/orders/${id}`);
