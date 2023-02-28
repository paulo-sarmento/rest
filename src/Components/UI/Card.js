import React, { useContext } from "react";
import CartContext from "../store/cart-context";
import classes from "./Card.module.css";

const Card = ({ id, img, name, price }) => {
  const ctx = useContext(CartContext);

  const onClickHandler = () => {
    ctx.addItem({
      id,
      img,
      name,
      price,
      amount: 1,
    });
  };

  return (
    <>
      <li className={classes.card} onClick={onClickHandler}>
        <div className={classes["container-img"]}>
          <img src={img} alt="" className={classes.img} />
        </div>
        <h1>{name}</h1>
        <h2 className={classes.price}>{`R$ ${price}`}</h2>
      </li>
    </>
  );
};
export default Card;
