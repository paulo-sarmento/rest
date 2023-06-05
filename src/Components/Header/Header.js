import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import classes from "./Header.module.css";

import Container from "../Layout/Container/Container";
import Logo from "../UI/Logo/Logo";
import CartIcon from "./Cart/Icon/CartIcon";
import Modal from "../Layout/Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Header = () => {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={classes.header}>
        <Container className={classes.wrapper}>
          <div className={classes["menu-icon"]} onClick={onClickHandler}>
            <FontAwesomeIcon icon={solid("bars")} />
          </div>
          {pathname === "/" ? <Logo /> : <></>}
          <CartIcon />
        </Container>
      </header>
      {createPortal(
        <Modal isOpen={isOpen} onClose={closeHandler} />,
        document.getElementById("root")
      )}
    </>
  );
};

export default Header;
