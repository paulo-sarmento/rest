import React, { useContext } from "react";
import Context from "../../store/context";
import classes from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Cart = () => {
  const ctx = useContext(Context);

  const onClickHandler = () => {
    ctx.onRouteChangeHandler("cart");
  };

  return (
    <div className={classes.cart}>
      <div className="cart_icon" onClick={onClickHandler}>
        <FontAwesomeIcon icon={solid("cart-plus")} />
      </div>
    </div>
  );
};

export default Cart;
