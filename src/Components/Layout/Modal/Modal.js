import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Modal.module.css";

import Container from "../Container/Container";
import Logo from "../../UI/Logo/Logo";
import Button from "../../UI/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

import Context from "../../Context/Context";

const Modal = ({ isOpen, onClose }) => {
  const { isSignIn, user, onLogout } = useContext(Context);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const onClickOrdersHandler = () => {
    if (isSignIn) {
      onClose();
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  const onClickLoginHandler = () => {
    navigate("/login");
  };

  const onClickRegisterHandler = () => {
    navigate("/register");
  };

  const onClickAdmHandler = () => {
    if (isSignIn) {
      onClose();
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const onClickCartHandler = () => {
    if (isSignIn) {
      onClose();
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const onClickLogoutHandler = () => {
    onLogout();
  };

  const onClickChangePasswordHandler = () => {
    navigate("/forgot-password");
    onClose();
  };

  return (
    <Container className={classes.modal}>
      <div className={classes.header}>
        <Logo />
        <span onClick={onClose} className={classes["close-btn"]}>
          <FontAwesomeIcon icon={solid("x")} />
        </span>
      </div>
      <div className={classes.wrapper}>
        <a onClick={onClickOrdersHandler}>Pedidos</a>
        <a onClick={onClickCartHandler}>Carrinho</a>
        <a onClick={onClickAdmHandler}>Administrador</a>
        {isSignIn ? (
          <>
            <p className={classes.hello}>{`Olá, ${user.name}`}</p>
            <a
              className={classes["change-password"]}
              onClick={onClickChangePasswordHandler}
            >
              Alterar Senha
            </a>
            <button
              onClick={onClickLogoutHandler}
              className={classes["logout-btn"]}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Button
              className={classes["login-btn"]}
              onClick={onClickLoginHandler}
            >
              Entrar
            </Button>
            <a href="#" onClick={onClickRegisterHandler}>
              criar conta
            </a>
          </>
        )}
      </div>
    </Container>
  );
};

export default Modal;
