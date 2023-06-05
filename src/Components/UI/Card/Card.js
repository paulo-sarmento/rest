import React, { useContext } from "react";

import classes from "./Card.module.css";

import CartContext from "../../Context/CartContext";

const Card = ({ id, img, name, price }) => {
  const { addItem } = useContext(CartContext);

  const onClickHandler = () => {
    addItem({
      id,
      img,
      name,
      price,
      amount: 1,
    });
  };

  return (
    <>
      <li key={id} className={classes.card} onClick={onClickHandler}>
        <div className={classes["container-img"]}>
          <img src={img} alt="" className={classes.img} />
        </div>
        <h1>{name}</h1>
        <h2 className={classes.price}>
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          })}
        </h2>
      </li>
    </>
  );
};
export default Card;
