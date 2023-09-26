import classes from "./HeaderDesktop.module.css";

import Container from "../Layout/Container/Container";
import Logo from "../UI/Logo/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalQuantity } from "../../features/cart/cartSlice";
import { cartSliceActions } from "../../features/cart/cartSlice";
import { authSliceActions } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const HeaderDesktop = () => {
  const [user, setUser] = useState(() => {
    const storedValue = sessionStorage.getItem("user");

    return storedValue ? JSON.parse(storedValue) : "";
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(authSliceActions.onLogout());
    dispatch(cartSliceActions.resetCart());
    setUser("");
  };

  const onClickUserHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const cartItemsQuantity = useSelector(selectTotalQuantity);

  return (
    <header>
      <Container className={classes.wrapper}>
        <Logo />
        <nav className={classes.nav}>
          <Link
            to={user ? `orders/${user.id}` : "login"}
            state={{ from: "orders" }}
          >
            Pedidos
          </Link>
          {user?.name === "adm" && <Link to="dashboard">Administrador</Link>}
          {user.id ? (
            <>
              <button className={classes.hello} onClick={onClickUserHandler}>
                <span>{`Olá, ${user.name}`}</span>
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <FontAwesomeIcon icon={solid("caret-up")} />
                </motion.span>
              </button>
              {isExpanded && (
                <>
                  <motion.div
                    className={classes["menu-wrapper"]}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className={classes["menu-arrow"]}></div>
                    <Link to={"change-password"} onClick={onClickUserHandler}>
                      Alterar Senha
                    </Link>
                    <a
                      className={classes["logout-btn"]}
                      onClick={onLogoutHandler}
                    >
                      Logout
                    </a>
                  </motion.div>
                </>
              )}
            </>
          ) : (
            <Link to="login">Login</Link>
          )}
          <Link to="cart">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
              className={classes.cart}
              key={cartItemsQuantity}
            >
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
            </motion.div>
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default HeaderDesktop;
