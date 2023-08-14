import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import CartItemsList from "./features/cart/CartItemsList";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Register from "./Pages/Register/Register";
import Orders from "./Pages/Orders/Orders";
import Private from "./Pages/Private/Private";
import Dashboard from "./Pages/Dashboard/Dashboard";

// const router = createBrowserRouter([
//   {
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "cart",
//         element: <CartItemsList />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//       {
//         path: "orders",
//         element: <Orders />,
//       },
//       {
//         path: "/dashboard",
//         element: (
//           <Private>
//             <Dashboard />
//           </Private>
//         ),
//       },
//       {
//         path: "/forgot-password",
//         element: <ForgotPassword />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
