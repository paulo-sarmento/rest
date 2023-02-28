import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./Components/store/context";
import CartProvider from "./Components/store/cartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ContextProvider>
);
