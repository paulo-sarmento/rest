import React, { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./CartIcon.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

import CartContext from "../../../Context/CartContext";

const Cart = () => {
  const { items } = useContext(CartContext);

  const cartItemsNumber = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <Link to="cart">
      <div className={classes.cart}>
        <div className="cart_icon">
          <div className={classes.number}>
            <div className={classes["total-amountWrapper"]}>
              <span className={classes["total-amount"]}>{cartItemsNumber}</span>
            </div>
          </div>
          <FontAwesomeIcon icon={solid("cart-plus")} />
        </div>
      </div>
    </Link>
  );
};

export default Cart;
