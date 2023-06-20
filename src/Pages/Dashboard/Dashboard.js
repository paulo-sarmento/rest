import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./Dashboard.module.css";

import Product from "./Product/Product";
import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";
import Order from "./Order/Order";
import AddProduct from "./Product/AddProduct/AddProduct";

import Context from "../../Components/Context/Context";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onAddProductHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const { products } = useContext(Context);

  const productsList = products.map((item) => {
    return (
      <Product
        key={item.id}
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        amount={1}
      />
    );
  });

  return (
    <>
      <section>
        <AddProduct />
        <Logo />
        <Container className={classes["container-products"]}>
          <div className={classes.wrapper}>
            <h1 className={classes.title}>Produtos</h1>
            <button
              className={`${classes.btn} ${classes["btn-add"]}`}
              onClick={onAddProductHandler}
            >
              add novo
            </button>
          </div>
          <ul className={classes.list}>{productsList}</ul>
        </Container>
        <Container className={classes["container-orders"]}>
          <h1 className={classes.title}>Pedidos</h1>
          <Order />
        </Container>
      </section>
      {createPortal(
        <AddProduct isOpen={isOpen} onClose={closeHandler} />,
        document.getElementById("root")
      )}
    </>
  );
};

export default Dashboard;
