import classes from "./Home.module.css";
import Filter from "../../Components/Filter/Filter";
import Products from "../../Components/Products/Products";
import Spinner from "../../Components/UI/Spinner/Spinner";

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
    content = (
      <main>
        <div className={classes.loader}>
          <Spinner />
        </div>
      </main>
    );
  } else if (isSuccess) {
    content = (
      <>
        <section className={classes.filter}>
          <Filter
            products={products[0]}
            filteredProducts={setFilteredProducts}
          />
        </section>
        <main>
          <Products
            productsList={filteredProducts ? filteredProducts : products[0]}
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
