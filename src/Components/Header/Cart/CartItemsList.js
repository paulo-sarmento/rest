import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./CartItemsList.module.css";

import Container from "../../Layout/Container/Container";
import Logo from "../../UI/Logo/Logo";
import Button from "../../UI/Button/Button";
import CartItem from "./CartItem";

import Context from "../../Context/Context";
import CartContext from "../../Context/CartContext";

const CartItemsList = () => {
  const { items, totalPrice, removeItem, addItem, makeOrder } = useContext(
    CartContext
  );

  const { isSignIn, user } = useContext(Context);

  const navigate = useNavigate();

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const onClickBuyHandler = () => {
    if (isSignIn) {
      makeOrder(user);
    } else {
      navigate("/login");
    }
  };

  const cartItems = items.map((item) => (
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
    <>
      <section>
        <Logo />
        <h1 className={classes.title}>CARRINHO</h1>
      </section>
      <main className={classes.main}>
        <Container className={classes.container}>
          <ul className={classes.list}>{cartItems}</ul>
          <div>
            <span className={classes.total}>Total:</span>
            <span className={classes.price}>
              {totalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <Button
            className={classes["btn-comprar"]}
            onClick={onClickBuyHandler}
          >
            finalizar compra
          </Button>
        </Container>
      </main>
    </>
  );
};

export default CartItemsList;
