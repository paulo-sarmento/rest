import React from "react";

import "./reset.css";
import classes from "./App.module.css";

import { Outlet, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// import Context from "./Components/Context/context";
// import { LoginContextProvider } from "./Components/Context/loginContext";

// import Logo from "./Components/UI/Logo";
// import Filter from "./Components/Filter/Filter";
// import Products from "./Components/Products/Products";
// import CartItemsList from "./Components/Header/Cart/CartItemsList";
// import Orders from "./Components/Orders/Orders";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" ? (
        <div className={classes.app}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <div className={classes.app}>
          <Outlet />
        </div>
      )}
    </>
  );

  // const ctx = useContext(Context);

  // let content = (
  //   <div className={classes.App}>
  //     <Header />
  //     <section className={classes.filter}>
  //       <Filter />
  //     </section>
  //     <main className={classes.main}>
  //       <Products
  //         productsList={
  //           ctx.filteredProducts ? ctx.filteredProducts : ctx.products
  //         }
  //       />
  //     </main>
  //     <footer className={classes.footer}>
  //       <Footer />
  //     </footer>
  //   </div>
  // );

  // if (ctx.route === "cart") {
  //   content = (
  //     <div className={classes.App}>
  //       <Header />
  //       <section>
  //         <Logo />
  //         <h1 className={classes.title}>Carrinho</h1>
  //       </section>
  //       <main className={classes.main}>
  //         <LoginContextProvider>
  //           <CartItemsList />
  //         </LoginContextProvider>
  //       </main>
  //       <footer className={classes.footer}>
  //         <Footer />
  //       </footer>
  //     </div>
  //   );
  // }

  // if (ctx.route === "pedidos") {
  //   content = (
  //     <div className={classes.App}>
  //       <Header />
  //       <section>
  //         <Logo />
  //         <h1 className={classes.title}>Pedidos</h1>
  //       </section>
  //       <main className={classes.main}>
  //         <Orders />
  //       </main>
  //       <footer className={classes.footer}>
  //         <Footer />
  //       </footer>
  //     </div>
  //   );
  // }
  // if (ctx.route === "main") {
  //   return content;
  // }

  // return content;
};

export default App;
