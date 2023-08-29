import classes from "./CartItem.module.css";
import Button from "../../Components/UI/Button/Button";
import { formatPrice } from "../../utils/formatUtils";

const CartItem = ({ id, img, name, price, quantity, onRemove, onAdd }) => {
  const onClickAddHandler = () => {
    onAdd({ id, img, name, price, quantity });
  };

  const onClickRemoveHandler = () => {
    onRemove(id);
  };

  return (
    <li key={id} className={classes["cart-item"]}>
      <div className={classes["wrapper-product"]}>
        <div className={classes["container-img"]}>
          <img src={img} alt="" className={classes.img} />
          <h1 className={classes.name}>{name}</h1>
        </div>
        <div className={classes.summary}>
          <h2 className={classes.price}>{formatPrice(price)}</h2>
          <span className={classes.quantity}>{`x ${quantity}`}</span>
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
    </li>
  );
};

export default CartItem;
