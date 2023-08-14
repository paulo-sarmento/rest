import classes from "./Orders.module.css";
import Card from "./UI/Card";
import Container from "../../Components/Layout/Container/Container";

import { useGetOrdersQuery } from "../../features/orders/ordersSlice";

const Orders = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  console.log(user);

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery(user?.id);

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
    <>{user?.id ? content : <p>faça login para vizualizar seus pedidos</p>}</>
  );
};

export default Orders;
