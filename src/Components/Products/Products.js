import React from "react";

import Container from "../Layout/Container/Container";
import Card from "../UI/Card/Card";
import classes from "./Products.module.css";

const Products = ({ productsList }) => {
  const items = productsList.map((item) => {
    return (
      <Card
        key={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        amount={1}
      />
    );
  });

  return (
    <section>
      <Container>
        <ul className={classes.list}>{items}</ul>
      </Container>
    </section>
  );
};

export default Products;
