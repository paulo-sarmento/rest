import React, { useContext } from "react";
import "./reset.css";
import classes from "./App.module.css";
import Header from "./Components/Header/Header";
import Filter from "./Components/Filter/Filter";
import Products from "./Components/Products/Products";
import Context from "./Components/store/context";

const App = () => {
  const ctx = useContext(Context);

  return (
    <div className={classes.App}>
      <Header />
      <section className={classes.filter}>
        <Filter />
      </section>
      <main className={classes.main}>
        <Products
          productsList={
            ctx.filteredProducts ? ctx.filteredProducts : ctx.DUMMY_PRODUCTS
          }
        />
      </main>
    </div>
  );
};

export default App;
