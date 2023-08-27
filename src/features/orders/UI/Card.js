import classes from "./Card.module.css";

import { formatPrice } from "../../../utils/formatUtils";
import { useState } from "react";

const Card = ({ id, data, products, totalPrice }) => {
  let productsContent = products.map((product, index) => (
    <li className={classes.wrapper}>
      <h3>{product.name}</h3>
      <h3>{product.amount}</h3>
      <h3>{formatPrice(product.price)}</h3>
    </li>
  ));

  const [isActive, setIsActive] = useState(false);

  const onClickHandler = () => {
    setIsActive(!isActive);
  };

  let componentClass = classes.list;

  if (isActive) {
    componentClass = `${classes.list} ${classes.active}`;
  }

  return (
    <>
      <li key={id} className={classes.item} onClick={onClickHandler}>
        <div>
          <h2 className={classes["item-title"]}>{`PEDIDO ${id} - ${data}`}</h2>
        </div>
        <ul className={componentClass}>{productsContent}</ul>
        <div>
          <h2>
            Total:
            <span className={classes.total}>{formatPrice(totalPrice)}</span>
          </h2>
        </div>
      </li>
    </>
  );
};
export default Card;
