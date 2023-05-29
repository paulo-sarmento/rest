import React, { useContext, useState, useEffect, useCallback } from "react";

import classes from "./Orders.module.css";

import Context from "../Context/context";

import Header from "../Header/Header";
import Container from "../Layout/Container";
import Logo from "../UI/Logo";

const Orders = () => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const ctx = useContext(Context);

  const fetchOrdersHandler = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:3001/orders?user=${ctx.user.id}`
      );

      const data = await res.json();

      if (data.length === 0) {
        setError("Nenhum pedido realizado");
      } else {
        const loadedOrders = [];

        for (const key in data) {
          loadedOrders.push({
            id: Number(key) + 1,
            data: new Date(data[key].data),
            name: data[key].nome,
            amount: data[key].qtd,
            price: data[key].preco,
            totalPrice: data[key].total,
          });
        }

        setOrders(loadedOrders);
      }
    } catch (error) {
      setError(error.message);
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

  const Card = ({ id, data, name, amount, price, totalPrice }) => {
    return (
      <>
        <li key={id} className={classes.item}>
          <div>
            <h2 className={classes["item-title"]}>{`PEDIDO ${id} - ${formatDate(
              data
            )}`}</h2>
          </div>
          <div className={classes.wrapper}>
            <h3>{name}</h3>
            <h3>{amount}</h3>
            <h3>
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
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

  const items = orders.map((item) => {
    return (
      <Card
        id={item.id}
        data={item.data}
        name={item.name}
        amount={item.amount}
        price={item.price}
        totalPrice={item.totalPrice}
      />
    );
  });

  return (
    <section className={classes.section}>
      <Container>
        <ul className={classes.list}>{items}</ul>
      </Container>
    </section>
  );
};

export default Orders;
