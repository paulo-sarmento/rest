import classes from "./Header.module.css";
import Container from "../Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Logo from "../UI/Logo/Logo";
import CartIcon from "../../features/cart/Icon/CartIcon";
import Modal from "../Layout/Modal/Modal";

import { useState } from "react";
import { createPortal } from "react-dom";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    setShowModal(!showModal);
    document.body.style.overflow = showModal ? "unset" : "hidden";
  };

  return (
    <>
      <header className={classes.header}>
        <Container className={classes.wrapper}>
          <div className={classes["menu-icon"]} onClick={onClickHandler}>
            <FontAwesomeIcon icon={solid("bars")} />
          </div>
          <Logo />
          <CartIcon />
        </Container>
      </header>
      {createPortal(
        <Modal showModal={showModal} closeModal={onClickHandler} />,
        document.getElementById("root")
      )}
    </>
  );
};

export default Header;
