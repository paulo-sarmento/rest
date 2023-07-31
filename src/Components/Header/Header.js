import classes from "./Header.module.css";
import Container from "../Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Logo from "../UI/Logo/Logo";
import CartIcon from "../../features/cart/Icon/CartIcon";
import Modal from "../Layout/Modal/Modal";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

const Header = () => {
  const { pathname } = useLocation();

  const [openModal, setOpenModal] = useState(false);

  const onClickHandler = () => {
    setOpenModal(!openModal);
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
        <Modal openModal={openModal} onClose={onClickHandler} />,
        document.getElementById("root")
      )}
    </>
  );
};

export default Header;
