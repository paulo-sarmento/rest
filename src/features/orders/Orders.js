import classes from "./Orders.module.css";
import Card from "./UI/Card";
import Container from "../../Components/Layout/Container/Container";

import { useGetOrdersByUserQuery } from "./ordersSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersByUserQuery(userId);

  if (userId === "undefined") {
    navigate("/login", { state: { from: "orders" } });
  } else if (JSON.stringify(orders) === "{}") {
    return (
      <main className={classes.main}>
        <p>nenhum pedido realizado</p>
      </main>
    );
  }

  let content;

  if (isLoading) {
    content = (
      <main className={classes.main}>
        <p>Carregando pedidos...</p>
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

  return <main className={classes.main}>{content}</main>;
};

export default Orders;
