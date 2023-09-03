import "./reset.css";
import "./App.css";

import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ChangePassword from "./Pages/ChangePassword/ChangePassword.js";
import CartItemsList from "./features/cart/CartItemsList";
import Orders from "./features/orders/Orders";
import Private from "./Pages/Private/Private";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EditProduct from "./Pages/Dashboard/Product/EditProduct/EditProduct";
import RegisterProduct from "./Pages/Dashboard/Product/RegisterProduct/RegisterProduct";

// import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

      { path: "orders/:userId", element: <Orders /> },

      {
        path: "dashboard",
        element: <Private />,
        children: [
          { index: true, element: <Dashboard /> },

          { path: "edit/:productId", element: <EditProduct /> },
          { path: "register", element: <RegisterProduct /> },
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
