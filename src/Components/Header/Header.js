import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./Header.module.css";

import Container from "../Layout/Container";
import Logo from "../UI/Logo";
import CartIcon from "./Cart/Icon/CartIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Header = () => {
  const { pathname } = useLocation();

  const [modal, setModal] = useState(false);

  const onClickHandler = () => {
    setModal(true);
  };
  const closeHandler = () => {
    setModal(false);
  };

  return (
    <header className={classes.header}>
      <Container className={classes.wrapper}>
        <div className={classes["menu-icon"]} onClick={onClickHandler}>
          <FontAwesomeIcon icon={solid("bars")} />
        </div>
        {pathname === "/" ? <Logo /> : <></>}
        <CartIcon />
      </Container>
    </header>
  );
};

export default Header;
