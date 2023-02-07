import React, { Component } from "react";
import classes from "./Header.module.css";
import Container from "../Layout/Container";
import Logo from "../UI/Logo";
import Cart from "./Cart/Cart";

const Header = () => {
  return (
    <>
      <header className={classes.header} id="header">
        <Container>
          <div className={classes.wrapper}>
            <Logo />
            <Cart />
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
