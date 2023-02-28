import React, { useContext } from "react";
import Container from "../../Layout/Container";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./CartItemsList.module.css";

const CartItemsList = () => {
  const ctx = useContext(CartContext);

  const items = ctx.items.map((item) => {
    return (
      <CartItem
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        amount={item.amount}
      />
    );
  });

  return (
    <section className={classes.main}>
      <Container>
        <div className={classes["table-head"]}>
          <span>Produto</span>
          <span>Qtd.</span>
          <span>Preço</span>
        </div>
        <ul className={classes.list}>{items}</ul>
        <div>
          <span>Total</span>
        </div>
        <button>finalizar compra</button>
      </Container>
    </section>
  );
};

export default CartItemsList;
