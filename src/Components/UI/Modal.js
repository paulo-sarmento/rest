import React, { useContext } from "react";
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
import Button from "./Button";
import Context from "../Context/context";
import Login from "../Login/Login";

const Modal = ({ open, onClose }) => {
  const ctx = useContext(Context);

  const onClickHandler = () => {
    if (ctx.isSignIn === false) {
      ctx.setShowLogin(true);
    }
  };

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
          {ctx.isSignIn === false ? (
            <>
              <Button className={classes["login-btn"]} onClick={onClickHandler}>
                Entrar
              </Button>
              <a href="#">criar conta</a>
            </>
          ) : (
            <p>{`Olá, ${ctx.user.name}`}</p>
          )}
        </div>
        {ctx.showLogin && <Login />}
      </Container>
    </>
  );
};
export default Modal;
