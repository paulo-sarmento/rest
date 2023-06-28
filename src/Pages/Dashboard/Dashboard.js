import React, { useContext, useState, useEffect } from "react";

import { createPortal } from "react-dom";

import classes from "./Dashboard.module.css";

import Product from "./Product/Product";
import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";
import Order from "./Order/Order";
import Modal from "./Product/Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

import Context from "../../Components/Context/Context";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState({});

  const [showInactiveForm, setShowInactiveForm] = useState(false);

  const [inactivateProductID, setInactivateProductID] = useState(null);

  const [showInactiveProducts, setShowInactiveProducts] = useState(() => {
    const storedValue = sessionStorage.getItem("showInactiveProducts");

    return storedValue ? JSON.parse(storedValue) : false;
  });

  const onAddProductHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setEditingProduct([]);
    setIsOpen(false);
  };

  const { products, inactiveProducts } = useContext(Context);

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

  const onCloseInactivateProductHandler = () => {
    setShowInactiveForm(false);
    setInactivateProductID(null);
  };

  const onConfirmInactivateProductHandler = () => {
    (async () => {
      const res = await fetch("http://localhost:3001/inactivate-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inactivateProductID,
        }),
      });

      const data = await res.json();

      console.log(data);

      setShowInactiveForm(false);
      setInactivateProductID(null);

      window.location.reload();
    })();
  };

  const onShowInactiveProductsChangeHandler = () => {
    if (showInactiveProducts) {
      setShowInactiveProducts(false);
      sessionStorage.setItem("showInactiveProducts", JSON.stringify(false));
    } else {
      setShowInactiveProducts(true);
      sessionStorage.setItem("showInactiveProducts", JSON.stringify(true));
    }
  };

  let productsList;

  if (showInactiveProducts && inactiveProducts.length > 0) {
    productsList = inactiveProducts.map((item) => {
      return (
        <Product
          key={item.id}
          id={item.id}
          img={item.img}
          name={item.name}
          price={item.price}
          amount={1}
          onEdit={onEditProduct}
          onDelete={(id) => {
            setShowInactiveForm(true);
            setInactivateProductID(id);
          }}
        />
      );
    });
  } else {
    productsList = products.map((item) => {
      return (
        <Product
          key={item.id}
          id={item.id}
          img={item.img}
          name={item.name}
          price={item.price}
          amount={1}
          onEdit={onEditProduct}
          onDelete={(id) => {
            setShowInactiveForm(true);
            setInactivateProductID(id);
          }}
        />
      );
    });
  }

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
            <div className={classes["inactive-wrapper"]}>
              <span className={classes["inactive-span"]}>inativos</span>
              <label htmlFor="inactive" className={classes.inactive}>
                <input
                  type="checkbox"
                  name="inactive"
                  id="inactive"
                  onChange={onShowInactiveProductsChangeHandler}
                  {...(showInactiveProducts ? { checked: "checked" } : {})}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
          </div>
          <ul className={classes.list}>
            {showInactiveProducts ? (
              inactiveProducts.length === 0 ? (
                <li>
                  <h1>nenhum produto inativo</h1>
                </li>
              ) : (
                productsList
              )
            ) : (
              productsList
            )}
          </ul>
        </Container>
        <Container className={classes["container-orders"]}>
          <h1 className={classes.title}>Pedidos</h1>
          <Order />
        </Container>
      </section>
      {showInactiveForm ? (
        <>
          <Container className={classes.bg}>
            <div className={classes.modal}>
              <div className={classes["wrapper-modal"]}>
                <h1 className={classes["form-title"]}>
                  {showInactiveProducts
                    ? "ativar produto?"
                    : "inativar produto?"}
                </h1>
                <div className={classes["wrapper-btn"]}>
                  <button
                    className={classes["btn-form"]}
                    onClick={onConfirmInactivateProductHandler}
                  >
                    <span className={classes["delete"]}>
                      <FontAwesomeIcon icon={solid("check")} />
                    </span>
                  </button>
                  <button
                    className={classes["btn-form"]}
                    onClick={onCloseInactivateProductHandler}
                  >
                    <span className={classes["no-delete"]}>
                      <FontAwesomeIcon icon={solid("x")} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : (
        <></>
      )}
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
