import classes from "./Card.module.css";

import { cartSliceActions } from "../../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

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
    <li key={id} className={classes.card} onClick={onClickHandler}>
      <div className={classes["container-img"]}>
        <img src={img} alt="" className={classes.img} />
      </div>
      <h1>{name}</h1>
      <h2 className={classes.price}>
        {price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })}
      </h2>
    </li>
  );
};
export default Card;
