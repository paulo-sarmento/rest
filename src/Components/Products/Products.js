import React from "react";
import { useSelector } from "react-redux";

import { selectAllProducts } from "../../features/products/productsSlice";

import Container from "../Layout/Container/Container";
import Card from "../UI/Card/Card";
import classes from "./Products.module.css";

const Products = ({ productsList }) => {
  const productss = useSelector(selectAllProducts);

  console.log(productss);

  const items = productsList.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        img={item.img}
        name={item.nome}
        price={item.preco}
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
