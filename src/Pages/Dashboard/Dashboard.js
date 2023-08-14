import classes from "./Dashboard.module.css";
import Product from "./Product/Product";
import Logo from "../../Components/UI/Logo/Logo";
import Container from "../../Components/Layout/Container/Container";

import { useGetProductsQuery } from "../../features/products/productsSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showInactiveProducts, setShowInactiveProducts] = useState(false);

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
    productsContent = products[showInactiveProducts ? 0 : 1].map((item) => {
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
  } else if (isError) {
    productsContent = <p>Ocorreu um erro ao carregar os produtos!</p>;
    console.log(error.data);
  }

  const onShowInactiveProductHandler = () => {
    setShowInactiveProducts(!showInactiveProducts);
  };

  return (
    <>
      <section>
        <Logo />
        <Container className={classes["container-products"]}>
          <div className={classes.wrapper}>
            <h1 className={classes.title}>Produtos</h1>
            <Link to="register">
              <button className={`${classes.btn} ${classes["btn-add"]}`}>
                add novo
              </button>
            </Link>
            <div className={classes["inactive-wrapper"]}>
              <span className={classes["inactive-span"]}>inativos</span>
              <label htmlFor="inactive" className={classes.inactive}>
                <input
                  type="checkbox"
                  name="inactive"
                  id="inactive"
                  onChange={onShowInactiveProductHandler}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
          </div>
          <div className={classes["search-bar"]}>
            <input
              type="text"
              className={classes.input}
              placeholder="procurar..."
            ></input>
          </div>
          <ul className={classes.list}>{productsContent}</ul>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
