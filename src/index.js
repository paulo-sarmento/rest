import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import CartItemsList from "./Components/Header/Cart/CartItemsList";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import { ContextProvider } from "./Components/Context/context";
import CartProvider from "./Components/Context/cartProvider";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "cart",
        element: <CartItemsList />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <CartProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CartProvider>
  </ContextProvider>
);
