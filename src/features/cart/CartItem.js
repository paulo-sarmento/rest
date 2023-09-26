import classes from "./CartItem.module.css";

import Button from "../../Components/UI/Button/Button";
import { formatPrice } from "../../utils/formatUtils";
import { motion } from "framer-motion";

const CartItem = ({ id, img, name, price, quantity, onRemove, onAdd }) => {
  const onClickAddHandler = () => {
    onAdd({ id, img, name, price, quantity });
  };

  const onClickRemoveHandler = () => {
    onRemove(id);
  };

  return (
    <motion.li
      layout
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      key={id}
      className={classes["cart-item"]}
    >
      <div className={classes["wrapper-product"]}>
        <div className={classes["container-img"]}>
          <img src={img} alt="" className={classes.img} />
          <h1 className={classes.name}>{name}</h1>
        </div>
        <div className={classes.summary}>
          <h2 className={classes.price}>{formatPrice(price)}</h2>
          <motion.span
            key={quantity}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.3 }}
            className={classes.quantity}
          >{`x ${quantity}`}</motion.span>
        </div>
      </div>
      <div className={classes["action-wrapper"]}>
        <Button className={classes.button} onClick={onClickAddHandler}>
          +
        </Button>
        <Button className={classes.button} onClick={onClickRemoveHandler}>
          −
        </Button>
      </div>
    </motion.li>
  );
};

export default CartItem;
