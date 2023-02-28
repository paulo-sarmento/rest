import React from "react";
import classes from "./CartItem.module.css";

const CartItem = ({ id, img, name, price, amount }) => {
  return (
    <li className={classes["cart-item"]}>
      <div className={classes.wrapper}>
        <div className={classes["container-product"]}>
          <img src={img} alt="" className={classes.img} />
          <h1>{name}</h1>
        </div>
      </div>
      <div className={classes.wrapper}>
        <span>{amount}</span>
      </div>
      <div className={classes.wrapper}>
        <h2 className={classes.price}>{`R$ ${price}`}</h2>
      </div>
    </li>
  );
};

export default CartItem;
