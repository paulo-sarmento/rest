import classes from "./Card.module.css";

const Card = ({ id, data, products, totalPrice }) => {
  return (
    <>
      <li key={id} className={classes.item}>
        <div>
          <h2 className={classes["item-title"]}>{`PEDIDO ${id} - ${data}`}</h2>
        </div>
        {products.map((product, index) => (
          <div className={classes.wrapper} key={index}>
            <h3>{product.name}</h3>
            <h3>{product.amount}</h3>
            <h3>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
        ))}
        <div>
          <h2>
            Total:
            <span className={classes.total}>
              {totalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </span>
          </h2>
        </div>
      </li>
    </>
  );
};
export default Card;
