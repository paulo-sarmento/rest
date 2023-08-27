import classes from "./HeaderDesktop.module.css";

import Container from "../Layout/Container/Container";
import Logo from "../UI/Logo/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalQuantity } from "../../features/cart/cartSlice";
import { authSliceActions } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const HeaderDesktop = () => {
  const [user, setUser] = useState(() => {
    const storedValue = sessionStorage.getItem("user");

    return storedValue ? JSON.parse(storedValue) : "";
  });

  const [caret, setCaret] = useState(true);

  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(authSliceActions.onLogout());
    setUser("");
  };

  const onClickUserHandler = () => {
    setCaret(!caret);
  };

  const cartItemsQuantity = useSelector(selectTotalQuantity);

  return (
    <header>
      <Container className={classes.wrapper}>
        <Logo />
        <nav className={classes.nav}>
          <Link to={`orders/${user?.id}`}>Pedidos</Link>
          <Link to="dashboard">Administrador</Link>
          {user.id ? (
            <>
              <button className={classes.hello} onClick={onClickUserHandler}>
                <span>{`Olá, ${user.name}`}</span>
                <span>
                  {caret ? (
                    <FontAwesomeIcon icon={solid("caret-down")} />
                  ) : (
                    <FontAwesomeIcon icon={solid("caret-up")} />
                  )}
                </span>
              </button>
              {!caret && (
                <>
                  <div className={classes["menu-wrapper"]}>
                    <div className={classes["menu-arrow"]}></div>
                    <a className={classes["change-password"]}>Alterar Senha</a>
                    <a
                      className={classes["logout-btn"]}
                      onClick={onLogoutHandler}
                    >
                      Logout
                    </a>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link to="login">Login</Link>
          )}
          <Link to="cart">
            <div className={classes.cart}>
              <div className={classes["cart-icon"]}>
                <div className={classes.number}>
                  <div className={classes["total-amountWrapper"]}>
                    <span className={classes["total-amount"]}>
                      {cartItemsQuantity}
                    </span>
                  </div>
                </div>
                <FontAwesomeIcon icon={solid("cart-plus")} />
              </div>
            </div>
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default HeaderDesktop;
