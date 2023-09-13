import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./reset.css";
import "./App.css";

import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ChangePassword from "./Pages/ChangePassword/ChangePassword.js";
import CartItemsList from "./features/cart/CartItemsList";
import Private from "./Pages/Private/Private";
import Orders from "./features/orders/Orders";
import Spinner from "./Components/UI/Spinner/Spinner";

const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

const EditProduct = lazy(() =>
  import("./Pages/Dashboard/Product/EditProduct/EditProduct")
);

const RegisterProduct = lazy(() =>
  import("./Pages/Dashboard/Product/RegisterProduct/RegisterProduct")
);

// import { Routes, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "change-password", element: <ChangePassword /> },

      { path: "cart", element: <CartItemsList /> },

      {
        path: "orders/:userId",
        element: <Orders />,
      },

      {
        path: "dashboard",
        element: <Private />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            ),
          },

          {
            path: "edit/:productId",
            element: (
              <Suspense fallback={<Spinner />}>
                <EditProduct />
              </Suspense>
            ),
          },
          {
            path: "register",
            element: (
              <Suspense fallback={<Spinner />}>
                <RegisterProduct />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />}></Route>

//           <Route path="login" element={<Login />}></Route>
//           <Route path="register" element={<Register />}></Route>
//           <Route path="forgot-password" element={<ChangePassword />}></Route>

//           <Route path="cart" element={<CartItemsList />}></Route>

//           <Route path="orders/:userId" element={<Orders />}></Route>

//           <Route path="dashboard" element={<Private />}>
//             <Route index element={<Dashboard />}></Route>

//             <Route path="edit/:productId" element={<EditProduct />}></Route>
//             <Route path="register" element={<RegisterProduct />}></Route>
//           </Route>
//         </Route>
//       </Routes>
//     </>
//   );
// };

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
