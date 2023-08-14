import "./reset.css";
import "./App.css";

import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartItemsList from "./features/cart/CartItemsList";
import Orders from "./Pages/Orders/Orders";
import Private from "./Pages/Private/Private";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EditProduct from "./Pages/Dashboard/Product/EditProduct/EditProduct";
import RegisterProduct from "./Pages/Dashboard/Product/RegisterProduct/RegisterProduct";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>

          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>

          <Route path="cart" element={<CartItemsList />}></Route>

          <Route path="orders" element={<Orders />}></Route>

          <Route path="dashboard" element={<Private />}>
            <Route index element={<Dashboard />}></Route>

            <Route path="edit/:productId" element={<EditProduct />}></Route>
            <Route path="register" element={<RegisterProduct />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

// import PostsList from "./features/posts/PostsList";
// import AddPostForm from "./features/posts/AddPostForm";
// import SinglePostPage from "./features/posts/SinglePostPage";
// import EditPostForm from "./features/posts/EditPostForm";
// import UsersList from "./features/users/UsersList";
// import UserPage from './features/users/UserPage';
// import Layout from "./components/Layout";
// import { Routes, Route, Navigate } from 'react-router-dom';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>

//         <Route index element={<PostsList />} />

//         <Route path="post">
//           <Route index element={<AddPostForm />} />
//           <Route path=":postId" element={<SinglePostPage />} />
//           <Route path="edit/:postId" element={<EditPostForm />} />
//         </Route>

//         <Route path="user">
//           <Route index element={<UsersList />} />
//           <Route path=":userId" element={<UserPage />} />
//         </Route>

//         {/* Catch all - replace with 404 component if you want */}
//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Route>
//     </Routes>
//   );
// }

// export default App;
