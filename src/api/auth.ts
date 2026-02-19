import api from "./axios";

export const loginUser = (data: { email: string; password: string }) =>
    api.post("/auth/login", data);

export const registerUser = (data: {
    name: string;
    email: string;
    password: string;
}) => api.post("/auth/register", data);

export const getUserProfile = () => api.get("/auth/profile");
