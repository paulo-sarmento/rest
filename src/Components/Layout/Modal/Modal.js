import classes from "./Modal.module.css";

import Logo from "../../UI/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Button from "../../UI/Button/Button";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authSliceActions } from "../../../features/auth/authSlice";
import { cartSliceActions } from "../../../features/cart/cartSlice";
import { motion } from "framer-motion";

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
    dispatch(cartSliceActions.resetCart());
    setUser("");
  };

  const onClickHandler = () => {
    closeModal();
  };

  if (showModal !== undefined) {
    if (!showModal) {
      return null;
    }
  }

  return (
    <motion.div
      key="modal-content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className={classes.modal}
    >
      <div className={classes.header}>
        <Logo className="queijo" />
        <span onClick={closeModal} className={classes["close-btn"]}>
          <FontAwesomeIcon icon={solid("x")} />
        </span>
      </div>
      <div className={classes.wrapper}>
        <Link
          to={user ? `orders/${user.id}` : "login"}
          state={{ from: "orders" }}
          onClick={onClickHandler}
        >
          Pedidos
        </Link>
        <Link to="cart" onClick={onClickHandler}>
          Carrinho
        </Link>
        {user?.name === "adm" && (
          <Link to="dashboard" onClick={onClickHandler}>
            Administrador
          </Link>
        )}

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
    </motion.div>
  );
};

export default Modal;
