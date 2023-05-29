import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./CartItemsList.module.css";

import Context from "../../Context/context";
import CartContext from "../../Context/cart-context";
import LoginContext from "../../Context/loginContext";

import Container from "../../Layout/Container";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import Login from "../../Login/Login";
import Register from "../../Register/Register";

const CartItemsList = () => {
  const [showLoginPortal, setLoginPortal] = useState(false);
  const [showRegisterPortal, setRegisterPortal] = useState(false);

  const ctx = useContext(Context);
  const cartCtx = useContext(CartContext);
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    if (loginContext.showLogin) {
      setLoginPortal(true);
      setRegisterPortal(false);
    } else if (loginContext.showRegister) {
      setRegisterPortal(true);
      setLoginPortal(false);
    }
  }, [loginContext.showLogin, loginContext.showRegister]);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onClickBuyHandler = () => {
    if (ctx.isSignIn) {
      cartCtx.makeOrder(ctx.user);
    } else {
      loginContext.setShowLogin(true);
    }
  };

  const items = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      img={item.img}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={() => cartItemRemoveHandler(item.id)}
      onAdd={() => cartItemAddHandler(item)}
    />
  ));

  return (
    <section className={classes.main}>
      <Container className={classes.container}>
        <ul className={classes.list}>{items}</ul>
        <div>
          <span className={classes.total}>Total:</span>
          <span className={classes.price}>{` R$ ${cartCtx.totalPrice.toFixed(
            2
          )}`}</span>
        </div>
        <Button className={classes["btn-comprar"]} onClick={onClickBuyHandler}>
          finalizar compra
        </Button>
      </Container>
      {showLoginPortal &&
        createPortal(
          <Login
            showLogin={loginContext.setShowLogin}
            showRegister={loginContext.setShowRegister}
          />,
          document.getElementById("root")
        )}
      {showRegisterPortal &&
        createPortal(
          <Register
            showLogin={loginContext.setShowLogin}
            showRegister={loginContext.setShowRegister}
          />,
          document.getElementById("root")
        )}
    </section>
  );
};

export default CartItemsList;
