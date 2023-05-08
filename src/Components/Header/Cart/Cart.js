import React, { useContext } from "react";
import Context from "../../store/context";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Cart = () => {
  const ctx = useContext(Context);
  const ctxCart = useContext(CartContext);

  const onClickHandler = () => {
    ctx.onRouteChangeHandler("cart");
  };

  const cartItemsNumber = ctxCart.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <div className={classes.cart}>
      <div className="cart_icon" onClick={onClickHandler}>
        <div className={classes.number}>
          <div className={classes["total-amountWrapper"]}>
            <span className={classes["total-amount"]}>
              {cartItemsNumber}
            </span>
          </div>
        </div>
        <FontAwesomeIcon icon={solid("cart-plus")} />
      </div>
    </div>
  );
};

export default Cart;
