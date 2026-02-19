import axios from "axios";

const api = axios.create({
    //   baseURL: "http://localhost:5000/api",
    baseURL: "https://the-crafted-chapter-a-bookstore-backend.onrender.com/api"

});

// REQUEST → attach JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// RESPONSE → handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const currentPath = window.location.pathname;
        if (error.response?.status === 401 && currentPath !== "/login" && currentPath !== "/register") {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
