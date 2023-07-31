import classes from "./CartIcon.module.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const CartIcon = () => {
  const cartItemsQuantity = useSelector(selectTotalQuantity);

  return (
    <Link to="cart">
      <div className={classes.cart}>
        <div className="cart_icon">
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
  );
};

export default CartIcon;
