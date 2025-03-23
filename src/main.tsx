import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";
import ShopContextProvider from "./context/ShopContextProvider"; 
import { CartContextProvider } from "./context/CartContextProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ShopContextProvider> 
      <CartContextProvider>
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </CartContextProvider>
    </ShopContextProvider>
  </React.StrictMode>
);
