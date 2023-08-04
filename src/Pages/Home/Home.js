import classes from "./Home.module.css";
import Filter from "../../Components/Filter/Filter";
import Products from "../../Components/Products/Products";

import { useGetProductsQuery } from "../../features/products/productsSlice";
import { useState } from "react";

const Home = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  const [filteredProducts, setFilteredProducts] = useState(null);

  let content;
  if (isLoading) {
    content = <p>Carregando...</p>;
  } else if (isSuccess) {
    content = (
      <>
        <section>
          <Filter filteredProducts={setFilteredProducts} />
        </section>
        <main className={classes.main}>
          <Products
            productsList={filteredProducts ? filteredProducts : products}
          />
        </main>
      </>
    );
  } else if (isError) {
    content = <p>"erro ao carregar produtos"</p>;
    console.log(error);
  }

  return content;
};

export default Home;
