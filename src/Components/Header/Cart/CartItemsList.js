import React, { useContext, useState } from "react";
import classes from "./CartItemsList.module.css";
import Container from "../../Layout/Container";
import Button from "../../UI/Button";
import Login from "../../Login/Login";
import Context from "../../Context/context";
import CartContext from "../../Context/cart-context";

import CartItem from "./CartItem";

const CartItemsList = () => {
  const ctx = useContext(Context);
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onClickHandler = () => {
    if (ctx.isSignIn) {
      cartCtx.makeOrder();
    } else {
      ctx.setShowLogin(true);
    }
  };

  const items = cartCtx.items.map((item) => {
    return (
      <CartItem
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={() => cartItemRemoveHandler(item.id)}
        onAdd={() => cartItemAddHandler(item)}
      />
    );
  });

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
        <Button className={classes["btn-comprar"]} onClick={onClickHandler}>
          finalizar compra
        </Button>
        {ctx.showLogin && <Login />}
      </Container>
    </section>
  );
};

export default CartItemsList;
