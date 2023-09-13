import classes from "./Orders.module.css";
import Card from "./UI/Card";
import Container from "../../Components/Layout/Container/Container";
import Spinner from "../../Components/UI/Spinner/Spinner";

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

  if (isSuccess) {
    console.log(orders);
  }

  if (isSuccess && JSON.stringify(orders) === "{}") {
    return (
      <main className={classes.main}>
        <p>nenhum pedido realizado</p>
      </main>
    );
  }

  let content;

  if (isLoading) {
    content = (
      <main>
        <Spinner />
      </main>
    );
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
        <main className={classes.main}>
          <section className={classes.section}>
            <Container>
              <ul className={classes.list}>{ordersList}</ul>
            </Container>
          </section>
        </main>
      </>
    );
  } else if (isError) {
    content = <p>{error.data}</p>;
  }

  return content;
};

export default Orders;
