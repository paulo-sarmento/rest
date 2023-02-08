import React, { Component } from "react";
import "./reset.css";
import classes from "./App.module.css";
import Header from "./Components/Header/Header";
import Filter from "./Components/Filter/Filter";
import Products from "./Components/Products/Products";

const DUMMY_PRODUCTS = [
  {
    id: "m1",
    img: "../../assets/img/coca.png",
    name: "Coca Cola lata 350ml",
    price: 2.44,
  },
  {
    id: "m2",
    img: "../../assets/img/fanta-laranja.png",
    name: "Fanta Laranja lata 350ml",
    price: 3.9,
  },
  {
    id: "m3",
    img: "../../assets/img/guarana.jpg",
    name: "Guarana Antarctica lata 350ml",
    price: 2.78,
  },
  {
    id: "m4",
    img: "../../assets/img/orange-juice.png",
    name: "Suco de laranja copo 300ml",
    price: 4.99,
  },
  {
    id: "m5",
    img: "../../assets/img/peps.png",
    name: "Peps lata 350ml",
    price: 2.09,
  },
  {
    id: "m6",
    img: "../../assets/img/water-bottle.png",
    name: "Água mineral 350ml",
    price: 1.99,
  },
];

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <section className={classes.filter}>
        <Filter />
      </section>
      <main className={classes.main}>
        <Products productsList={DUMMY_PRODUCTS} />
      </main>
    </div>
  );
};

export default App;
