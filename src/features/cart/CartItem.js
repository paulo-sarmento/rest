import classes from "./CartItem.module.css";
import { motion } from "framer-motion";
import Button from "../../Components/UI/Button/Button";

const CartItem = ({ id, img, name, price, amount, onRemove, onAdd }) => {
  const onClickAddHandler = () => {
    onAdd({ id, img, name, price, amount });
  };

  const onClickRemoveHandler = () => {
    onRemove(id);
  };

  return (
    <motion.li
      key={id}
      className={classes["cart-item"]}
      drag={"x"}
      dragConstraints={{ right: 95, left: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
    >
      <div className={classes["action-wrapper"]}>
        <Button className={classes.button} onClick={onClickAddHandler}>
          +
        </Button>
        <Button className={classes.button} onClick={onClickRemoveHandler}>
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
        <h2 className={classes.price}>
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>
    </motion.li>
  );
};

export default CartItem;
