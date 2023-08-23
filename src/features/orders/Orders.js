import classes from "./Orders.module.css";
import Card from "./UI/Card";
import Container from "../../Components/Layout/Container/Container";

import { useGetOrdersByUserQuery } from "./ordersSlice";
import { useParams } from "react-router-dom";

const Orders = () => {
  const { userId } = useParams();

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersByUserQuery(userId);

  console.log(orders);

  if (userId === "undefined") {
    return <p>faça login para visualizar seus pedidos</p>;
  } else if (JSON.stringify(orders) === "{}") {
    return <p>nenhum pedido realizado</p>;
  }

  let content;

  if (isLoading) {
    content = <p>Carregando pedidos...</p>;
  } else if (isSuccess) {
    let ordersList = [];
    let i = 0;

    for (const key in orders) {
      i++;
      ordersList.push(
        <Card
          key={i}
          id={i}
          data={orders[key].data}
          products={orders[key].products}
          totalPrice={orders[key].totalPrice}
        />
      );
    }

    content = (
      <>
        <section>
          <h1 className={classes.title}>PEDIDOS</h1>
        </section>
        <section className={classes.section}>
          <Container>
            <ul className={classes.list}>{ordersList}</ul>
          </Container>
        </section>
      </>
    );
  } else if (isError) {
    content = <p>{error.data}</p>;
  }

  return <>{content}</>;
};

export default Orders;
