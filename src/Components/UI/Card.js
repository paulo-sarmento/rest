import React from "react";
import classes from "./Card.module.css";

const Card = ({ id, img, name, price }) => {
  return (
    <li className={classes.card}>
      <div className={classes["container-img"]}>
        <img src={img} alt="" className={classes.img} />
      </div>
      <h1>{name}</h1>
      <h2 className={classes.price}>{`R$ ${price}`}</h2>
    </li>
  );
};
export default Card;
