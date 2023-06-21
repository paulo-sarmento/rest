import React, { useContext, useState } from "react";

import { createPortal } from "react-dom";

import classes from "./Dashboard.module.css";

import Product from "./Product/Product";
import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";
import Order from "./Order/Order";
import Modal from "./Product/Modal/Modal";

import Context from "../../Components/Context/Context";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState({});

  const onAddProductHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setEditingProduct([]);
    setIsOpen(false);
  };

  const { products } = useContext(Context);

  const onEditProduct = (id) => {
    setIsOpen(true);

    (async () => {
      const res = await fetch("http://localhost:3001/editing-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const product = await res.json();

      setEditingProduct(product);
    })();
  };

  const onRemoveProduct = (id) => {};

  const productsList = products.map((item) => {
    return (
      <Product
        key={item.id}
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        amount={1}
        onEdit={onEditProduct}
        onRemove={onRemoveProduct}
      />
    );
  });

  return (
    <>
      <section>
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
        <Modal
          isOpen={isOpen}
          onClose={closeHandler}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />,
        document.getElementById("root")
      )}
    </>
  );
};

export default Dashboard;
