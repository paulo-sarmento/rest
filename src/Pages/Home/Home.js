import React, { useContext } from "react";

import classes from "./Home.module.css";

import Filter from "../../Components/Filter/Filter";
import Products from "../../Components/Products/Products";

import Context from "../../Components/Context/Context";

const Home = () => {
  const { filteredProducts, products } = useContext(Context);

  return (
    <>
      <section>
        <Filter />
      </section>
      <main className={classes.main}>
        <Products
          productsList={filteredProducts ? filteredProducts : products}
        />
      </main>
    </>
  );
};

export default Home;
