import React, { useState } from "react";
import classes from "./Header.module.css";
import Container from "../Layout/Container";
import Logo from "../UI/Logo";
import Cart from "./Cart/Cart";
import Modal from "../UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={classes.header} id="header">
        <Container className={classes.wrapper}>
          <div className={classes["menu-icon"]} onClick={onClickHandler}>
            <FontAwesomeIcon icon={solid("bars")} />
          </div>
          <Logo />
          <Cart />
        </Container>
        <Modal open={isOpen} onClose={closeHandler} />
      </header>
    </>
  );
};

export default Header;
