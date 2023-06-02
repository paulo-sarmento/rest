import React from "react";
import classes from "./CartItem.module.css";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Button from "../../UI/Button";

const CartItem = ({ id, img, name, price, amount, onAdd, onRemove }) => {
  
  return (
    <motion.li
      className={classes["cart-item"]}
      drag={"x"}
      dragConstraints={{ right: 95, left: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
    >
      <div className={classes["action-wrapper"]}>
        <Button className={classes.button} onClick={onAdd}>
          +
        </Button>
        <Button className={classes.button} onClick={onRemove}>
          −
        </Button>
      </div>
      <div className={classes["wrapper-product"]}>
        <div className={classes["container-img"]}>
          <img src={img} alt="" className={classes.img} />
        </div>
        <h1 className={classes.name}>{name}</h1>
      </div>
      <div className={`${classes.wrapper} ${classes.amount}`}>
        <span>{amount}</span>
      </div>
      <div className={classes.wrapper}>
        <h2 className={classes.price}>{`R$ ${price}`}</h2>
      </div>
    </motion.li>
  );
};

export default CartItem;