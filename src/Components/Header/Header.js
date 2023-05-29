import React, { useState, useContext } from "react";

import classes from "./Header.module.css";

import Context from "../Context/context";
import { LoginContextProvider } from "../Context/loginContext";

import Container from "../Layout/Container";
import Logo from "../UI/Logo";
import Cart from "./Cart/Cart";
import Modal from "../UI/Modal";

import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Header = () => {
  const ctx = useContext(Context);

  const [modal, setModal] = useState(false);

  const onClickHandler = () => {
    setModal(true);
  };
  const closeHandler = () => {
    setModal(false);
  };

  return (
    <>
      <header className={classes.header} id="header">
        <Container className={classes.wrapper}>
          <div className={classes["menu-icon"]} onClick={onClickHandler}>
            <FontAwesomeIcon icon={solid("bars")} />
          </div>
          {ctx.route === "home" ? <Logo /> : <></>}
          <Cart />
        </Container>
        {createPortal(
          <LoginContextProvider>
            <Modal onOpen={modal} onClose={closeHandler} />
          </LoginContextProvider>,
          document.getElementById("root")
        )}
      </header>
    </>
  );
};

export default Header;
