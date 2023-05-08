import React, { useContext } from "react";
import Container from "../../Layout/Container";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./CartItemsList.module.css";
import Button from "../../UI/Button";

const CartItemsList = () => {
  const ctx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const onClickHandler = () => {
    console.log("teste")
  }

  const items = ctx.items.map((item) => {
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
          <span className={classes.price}>{` R$ ${ctx.totalPrice.toFixed(
            2
          )}`}</span>
        </div>
        <Button className={classes["btn-comprar"]} onClick={onClickHandler}>finalizar compra</Button>
      </Container>
    </section>
  );
};

export default CartItemsList;
