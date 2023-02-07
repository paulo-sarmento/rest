import React, { Component } from "react";
import "./reset.css";
import classes from "./App.module.css"
import Header from "./Components/Header/Header";
import Filter from "./Components/Filter/Filter";

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <section className={classes.filter}>
        <Filter />
      </section>
    </div>
  );
};

export default App;
