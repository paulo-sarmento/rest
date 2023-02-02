import React, { Component } from "react";
import classes from "./Header.module.css";
import Container from "../Layout/Container";
import Menu from "./Menu/Menu";
import Cart from "./Cart/Cart";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Container>
          <div className={classes.wrapper}>
            <Menu />
            <Cart />
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
