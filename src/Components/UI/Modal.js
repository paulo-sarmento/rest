import React from "react";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Container from "../Layout/Container";

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <>
      <Container className={classes.modal}>
        <div className={classes.header}>
          <Logo />
          <span onClick={onClose} className={classes["close-btn"]}>
            <FontAwesomeIcon icon={solid("x")} />
          </span>
        </div>
        <div className={classes.wrapper}>
          <a href="#">Pedidos</a>
          <a href="#">Administrador</a>
          <button className={classes["login-btn"]}>Entrar</button>
          <a href="#">criar conta</a>
        </div>
      </Container>
    </>
  );
};
export default Modal;
