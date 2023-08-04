import classes from "./Orders.module.css";
import Card from "./UI/Card";
import Container from "../../Components/Layout/Container/Container";

import { useParams } from "react-router-dom";

import { useGetOrdersQuery } from "../../features/orders/ordersSlice";

const Orders = () => {
  const { userId } = useParams();

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery(userId);

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
    content = <p>erro ao carregar pedidos</p>;
    console.log(error);
  }

  return (
    <>
      {Number(userId) === 0 ? (
        <p>faça login para vizualizar seus pedidos</p>
      ) : (
        content
      )}
    </>
  );
};

export default Orders;
