import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import CartItemsList from "./Components/Header/Cart/CartItemsList";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Orders from "./Pages/Orders/Orders";

import { ContextProvider } from "./Components/Context/ContextProvider";
import CartProvider from "./Components/Context/CartProvider";

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
      {
        path: "orders",
        element: <Orders />,
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
