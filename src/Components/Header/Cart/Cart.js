import React, { Component } from "react";
import classes from "./Cart.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const Cart = () => {
  return (
    <div className={classes.cart}>
      <div className="cart_icon">
        <FontAwesomeIcon icon={solid('cart-plus')} />
      </div>
    </div>
  );
};

export default Cart;