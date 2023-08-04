import "./reset.css";

import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartItemsList from "./features/cart/CartItemsList";
import Orders from "./Pages/Orders/Orders";
import Private from "./Pages/Private/Private";
import Dashboard from "./Pages/Dashboard/Dashboard";

import { Routes, Route } from "react-router-dom";
import EditingProduct from "./Pages/Dashboard/Product/EditingProduct/EditingProduct";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>

          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>

          <Route path="cart" element={<CartItemsList />}></Route>

          <Route path="orders/:userId" element={<Orders />}></Route>

          <Route path="dashboard" element={<Private />}>
            <Route index element={<Dashboard />}></Route>

            <Route
              path="dashboard/edit/:productId"
              element={<EditingProduct />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
