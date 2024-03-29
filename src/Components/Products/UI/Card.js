import classes from "./Card.module.css";

import { cartSliceActions } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../../utils/formatUtils";
import { motion } from "framer-motion";

const Card = ({ id, img, name, price }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(
      cartSliceActions.addItem({
        id,
        img,
        name,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <motion.li
      layout
      whileTap={{ scale: 0.9 }}
      key={id}
      className={classes.card}
      onClick={onClickHandler}
    >
      <div className={classes["container-img"]}>
        <img src={img} alt="" className={classes.img} />
      </div>
      <h1 className={classes.name}>{name}</h1>
      <h2 className={classes.price}>{formatPrice(price)}</h2>
    </motion.li>
  );
};
export default Card;
