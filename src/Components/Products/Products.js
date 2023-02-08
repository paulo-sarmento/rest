import React from "react";
import Card from "../UI/Card";
import classes from "./Products.module.css";

const Products = ({ productsList }) => {
  const items = productsList.map((item) => {
    return (
      <Card id={item.id} img={item.img} name={item.name} price={item.price} />
    );
  });

  return (
    <section>
      <ul>{items}</ul>
    </section>
  );
};

export default Products;
