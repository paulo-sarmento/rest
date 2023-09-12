import classes from "./Dashboard.module.css";
import Product from "./Product/Product";
import Logo from "../../Components/UI/Logo/Logo";
import Container from "../../Components/Layout/Container/Container";
import Filter from "../../Components/Filter/Filter";

import { useGetProductsQuery } from "../../features/products/productsSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import Orders from "./Orders/Orders";

const Dashboard = () => {
  const [showInactiveProducts, setShowInactiveProducts] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  let productsContent;

  if (isLoading) {
    productsContent = <p>Carregando produtos...</p>;
  } else if (isSuccess) {
    if (filteredProducts) {
      productsContent = filteredProducts.map((item) => {
        return (
          <Product
            key={item.id}
            id={item.id}
            img={item.imgSrc}
            name={item.name}
            price={item.price}
            inactive={item.inactive}
          />
        );
      });
    } else {
      productsContent = products[showInactiveProducts].map((item) => {
        return (
          <Product
            key={item.id}
            id={item.id}
            img={item.imgUrl}
            name={item.name}
            price={item.price}
            inactive={item.inactive}
          />
        );
      });
    }
  } else if (isError) {
    productsContent = <p>Ocorreu um erro ao carregar os produtos!</p>;
    console.log(error.data);
  }

  const onShowInactiveProductHandler = () => {
    if (showInactiveProducts) {
      return setShowInactiveProducts(0);
    }

    setShowInactiveProducts(1);
  };

  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container className={classes["container-products"]}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Produtos</h1>
          <Link to="register">
            <button className={`${classes.btn} ${classes["btn-add"]}`}>
              cadastrar produto
            </button>
          </Link>
          <div
            className={classes["inactive-wrapper"]}
            disabled={filteredProducts?.length ? true : false}
          >
            <span className={classes["inactive-span"]}>inativos</span>
            <label htmlFor="inactive" className={classes.inactive}>
              <input
                type="checkbox"
                name="inactive"
                id="inactive"
                onChange={onShowInactiveProductHandler}
                disabled={filteredProducts?.length ? true : false}
              />
              <span className={classes.slider}></span>
            </label>
          </div>
        </div>
        {isSuccess && (
          <Filter
            products={products[showInactiveProducts]}
            filteredProducts={setFilteredProducts}
          />
        )}

        <ul className={classes.list}>{productsContent}</ul>
        <Orders />
      </Container>
    </>
  );
};

export default Dashboard;
