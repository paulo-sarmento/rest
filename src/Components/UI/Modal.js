import React, { useContext, useState } from "react";

import classes from "./Modal.module.css";

import Context from "../Context/context";
import LoginContext from "../Context/loginContext";

import Container from "../Layout/Container";
import Logo from "./Logo";
import Button from "./Button";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Orders from "../Orders/Orders";

import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Modal = ({ onOpen, onClose }) => {
  const ctx = useContext(Context);
  const loginContext = useContext(LoginContext);

  // const [showOrders, setShowOrders] = useState(false);

  const onClickLoginHandler = () => {
    if (ctx.isSignIn === false) {
      loginContext.setShowLogin(true);
    }
  };

  const onClickRegisterHandler = () => {
    if (ctx.isSignIn === false) {
      loginContext.setShowRegister(true);
    }
  };

  const onClickOrdersHandler = () => {
    if (ctx.isSignIn === true) {
      ctx.onRouteChangeHandler("pedidos");
      onClose();
    } else {
      loginContext.setShowLogin(true);
    }
  };

  if (!onOpen) return null;

  if (onOpen && loginContext.showLogin) {
    return (
      <>
        {createPortal(
          <Login
            showLogin={loginContext.setShowLogin}
            showRegister={loginContext.setShowRegister}
            showForgotPassword={loginContext.setSetShowForgotPassword}
          />,
          document.getElementById("root")
        )}
      </>
    );
  }

  if (onOpen && loginContext.showRegister) {
    return (
      <>
        {createPortal(
          <Register
            showRegister={loginContext.setShowRegister}
            showLogin={loginContext.setShowLogin}
          />,
          document.getElementById("root")
        )}
      </>
    );
  }

  if (onOpen && loginContext.showForgotPassword) {
    return (
      <>
        {createPortal(
          <ForgotPassword
            showForgotPassword={loginContext.setSetShowForgotPassword}
            showLogin={loginContext.setShowLogin}
          />,
          document.getElementById("root")
        )}
      </>
    );
  }

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
          <a onClick={onClickOrdersHandler}>Pedidos</a>
          <a>Administrador</a>
          {ctx.isSignIn === false ? (
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
            <p>{`Olá, ${ctx.user.name}`}</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Modal;
