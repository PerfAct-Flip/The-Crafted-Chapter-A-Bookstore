import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";
import ShopContextProvider from "./context/ShopContextProvider"; 
import { CartContextProvider } from "./context/CartContextProvider";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
    <ShopContextProvider> 
      <CartContextProvider>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </CartContextProvider>
    </ShopContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
