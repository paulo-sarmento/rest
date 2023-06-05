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
  if (!isOpen) return null;

  const { isSignIn, user } = useContext(Context);

  const navigate = useNavigate();

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
        <a>Administrador</a>
        {isSignIn === false ? (
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
        ) : (
          <p className={classes.hello}>{`Olá, ${user.name}`}</p>
        )}
      </div>
    </Container>
  );
};

export default Modal;
