import classes from "./CartIcon.module.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";

const CartIcon = () => {
  const cartItemsQuantity = useSelector(selectTotalQuantity);

  return (
    <Link to="cart">
      <motion.div
        key={cartItemsQuantity}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.3 }}
        className={classes.cart}
      >
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
      </motion.div>
    </Link>
  );
};

export default CartIcon;
