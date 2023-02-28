import React, { useContext } from "react";
import Context from "./Components/store/context";
import "./reset.css";
import classes from "./App.module.css";
import Header from "./Components/Header/Header";
import Filter from "./Components/Filter/Filter";
import CartItemsList from "./Components/Header/Cart/CartItemsList";
import Products from "./Components/Products/Products";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const ctx = useContext(Context);
  let mainContent;
  if (ctx.route === "home") {
    mainContent = (
      <main className={classes.main}>
        <Products
          productsList={
            ctx.filteredProducts ? ctx.filteredProducts : ctx.DUMMY_PRODUCTS
          }
        />
      </main>
    );
  } else if (ctx.route === "cart") {
    mainContent = (
      <main className={classes.main}>
        <CartItemsList />
      </main>
    );
  }

  return (
    <div className={classes.App}>
      <Header />
      <section className={classes.filter}>
        <Filter />
      </section>
      {mainContent}
      <footer className={classes.footer}>
        <Footer />
      </footer>
      <div className={classes.App}></div>
    </div>
  );
};

export default App;
