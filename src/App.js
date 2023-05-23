import React, { useContext } from "react";
import "./reset.css";
import classes from "./App.module.css";

import Context, { ContextProvider } from "./Components/Context/context";
import Header from "./Components/Header/Header";
import Logo from "./Components/UI/Logo";
import Filter from "./Components/Filter/Filter";
import Products from "./Components/Products/Products";
import CartItemsList from "./Components/Header/Cart/CartItemsList";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const ctx = useContext(Context);
  let content = (
    <div className={classes.App}>
      <Header />
      <section className={classes.filter}>
        <Filter />
      </section>
      <main className={classes.main}>
        <Products
          productsList={
            ctx.filteredProducts ? ctx.filteredProducts : ctx.products
          }
        />
      </main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );

  if (ctx.route === "cart") {
    content = (
      <div className={classes.App}>
        <Header />
        <section>
          <Logo />
          <h1 className={classes.title}>Carrinho</h1>
        </section>
        <main className={classes.main}>
          <CartItemsList />
        </main>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </div>
    );
  }

  if (ctx.route === "pedidos") {
    content = (
      <div className={classes.App}>
        <Header />
        <section>
          <Logo />
          <h1 className={classes.title}>Pedidos</h1>
        </section>
        <main className={classes.main}>
          <CartItemsList />
        </main>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </div>
    );
  }
  if (ctx.route === "main") {
    return content;
  }

  return content;
};

export default App;
