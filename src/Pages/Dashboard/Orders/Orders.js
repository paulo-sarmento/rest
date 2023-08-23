import classes from "./Orders.module.css";
import { formatDate, formatPrice } from "../../../utils/formatUtils";

import { useGetOrdersQuery } from "../../../features/orders/ordersSlice";

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  let content;

  if (isLoading) {
    content = <p>Carregando pedidos...</p>;
  } else if (isSuccess) {
    content = orders.map((order) => {
      return (
        <>
          <li key={order.id} className={classes["list-item"]}>
            <div>
              <span className={classes.span}>ID</span>
              <h2>{order.id}</h2>
            </div>
            <div>
              <span className={classes.span}>Data</span>
              <h2>{formatDate(order.data)}</h2>
            </div>
            <div>
              <span className={classes.span}>Cliente</span>
              <h2>{order.nome}</h2>
            </div>
            <div>
              <span className={classes.span}>Total</span>
              <h2>{formatPrice(order.total)}</h2>
            </div>
          </li>
        </>
      );
    });
  } else if (isError) {
    content = <p>erro ao carregar pedidos</p>;
    console.log(error);
  }

  return (
    <>
      <div className={classes["orders-wrapper"]}>
        <h1 className={classes.title}>Pedidos</h1>
        <ul>{content}</ul>
        {isSuccess && (
          <div>
            <h1 className={classes.total}>{`Total Geral: ${formatPrice(
              orders.totalPrice
            )}`}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
