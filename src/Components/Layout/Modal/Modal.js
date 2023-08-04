import classes from "./Modal.module.css";

import Container from "../Container/Container";
import Logo from "../../UI/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Button from "../../UI/Button/Button";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authSliceActions } from "../../../features/auth/authSlice";

const Modal = ({ showModal, closeModal }) => {
  const [user, setUser] = useState(() => {
    const storedValue = sessionStorage.getItem("user");

    return storedValue ? JSON.parse(storedValue) : "";
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLoginHandler = () => {
    navigate("/login");
  };

  const onLogoutHandler = () => {
    dispatch(authSliceActions.onLogout());
    setUser("");
  };

  const onClickHandler = () => {
    closeModal();
  };

  if (!showModal) return null;

  return (
    <Container className={classes.modal}>
      <div className={classes.header}>
        <Logo />
        <span onClick={closeModal} className={classes["close-btn"]}>
          <FontAwesomeIcon icon={solid("x")} />
        </span>
      </div>
      <div className={classes.wrapper}>
        <Link to={`orders/${user.id || 0}`} onClick={onClickHandler}>
          Pedidos
        </Link>
        <Link to="cart" onClick={onClickHandler}>
          Carrinho
        </Link>
        <Link to="dashboard" onClick={onClickHandler}>
          Administrador
        </Link>

        {user.id ? (
          <>
            <p className={classes.hello}>{`Olá, ${user.name}`}</p>
            <a className={classes["change-password"]}>Alterar Senha</a>
            <button className={classes["logout-btn"]} onClick={onLogoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Button className={classes["login-btn"]} onClick={onLoginHandler}>
              Entrar
            </Button>
            <Link to="/register">criar conta</Link>
          </>
        )}
      </div>
    </Container>
  );
};

export default Modal;
