import React, { useContext, useState, useEffect, useCallback } from "react";

import classes from "./Orders.module.css";

import Context from "../Context/context";
import Container from "../Layout/Container";

const Orders = () => {
  const [message, setMessage] = useState(null);
  const [orders, setOrders] = useState([]);

  const ctx = useContext(Context);

  const fetchOrdersHandler = useCallback(async () => {
    setMessage(null);
    try {
      const res = await fetch(
        `http://localhost:3001/orders?user=${ctx.user.id}`
      );

      const data = await res.json();

      if (data.length === 0) {
        return setMessage("Nenhum pedido realizado");
      } else {
        const groupData = data.reduce((acc, obj) => {
          const id = obj.id_pedido;
          if (!acc[id]) {
            acc[id] = [];
          }
          acc[id].push(obj);
          return acc;
        }, {});

        const dataOrders = Object.entries(groupData).map((order) => {
          return order[1];
        });

        const structuredOrders = dataOrders.map((item) => {
          const [{ id_pedido, data, total }] = item;

          const products = item.map((product) => {
            const { nome, qtd, preco } = product;

            return {
              name: nome,
              amount: qtd,
              price: preco,
            };
          });

          return {
            id: id_pedido,
            data: new Date(data),
            products: products,
            totalPrice: total,
          };
        });

        setOrders(structuredOrders);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  useEffect(() => {
    fetchOrdersHandler();
  }, [fetchOrdersHandler]); // [] determina quando essa função de useEffect será executada, somente será executada novamente se as dependências listadas dentro do [] mudar

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = new Date(date).toLocaleString("pt-BR", options);
    return formattedDate;
  };

  const Card = ({ id, data, products, totalPrice }) => {
    return (
      <>
        <li key={id} className={classes.item}>
          <div>
            <h2 className={classes["item-title"]}>{`PEDIDO ${id} - ${formatDate(
              data
            )}`}</h2>
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

  const items = orders.map((item, i) => {
    return (
      <Card
        id={i + 1}
        data={item.data}
        products={item.products}
        totalPrice={item.totalPrice}
      />
    );
  });

  return (
    <>
      {message === null ? (
        <section className={classes.section}>
          <Container>
            <ul className={classes.list}>{items}</ul>
          </Container>
        </section>
      ) : (
        <section className={classes.section}>
          <Container>
            <p className={classes.error}>{message}</p>
          </Container>
        </section>
      )}
    </>
  );
};

export default Orders;
