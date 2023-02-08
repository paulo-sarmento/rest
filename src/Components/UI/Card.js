import React from "react";
import classes from "./Card.module.css";

const Card = ({ id, img, name, price }) => {
  return (
    <li className={classes.card}>
      <img src={img} alt="" className={classes.img} />
      <h1>{name}</h1>
      <h2>{price}</h2>
    </li>
  );
};

export default Card;
