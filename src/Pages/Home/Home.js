import React, { useContext } from "react";
import { useGetProductsQuery } from "../../features/products/productsSlice";

import classes from "./Home.module.css";

import Filter from "../../Components/Filter/Filter";
import Products from "../../Components/Products/Products";

import Context from "../../Components/Context/Context";

const Home = () => {
  const { filteredProducts, products } = useContext(Context);
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <>
        <section>
          <Filter />
        </section>
        <main className={classes.main}>
          <Products productsList={data} />
        </main>
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
};

export default Home;
