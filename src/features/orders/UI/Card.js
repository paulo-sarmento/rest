import classes from "./Card.module.css";

import { formatPrice } from "../../../utils/formatUtils";

const Card = ({ id, data, products, totalPrice }) => {
  let productsContent = products.map((product, index) => (
    <div className={classes.order}>
      <h3>{product.name}</h3>
      <h3>{product.amount}</h3>
      <h3>{formatPrice(product.price)}</h3>
    </div>
  ));

  return (
    <>
      <li key={id} className={classes.item}>
        <div>
          <h2 className={classes["item-title"]}>{`PEDIDO - ${data}`}</h2>
        </div>
        <section>{productsContent}</section>
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
