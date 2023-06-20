import React, { useEffect, useCallback, useState, useContext } from "react";

import classes from "./Order.module.css";

import Context from "../../../Components/Context/Context";

const Order = () => {
  const [orders, setOrders] = useState();
  const [message, setMessage] = useState();
  const { formatDate } = useContext(Context);

  const fetchOrdersHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/dashboard-orders");

      const data = await response.json();

      const loadedOrders = [];

      for (const key in data) {
        loadedOrders.push({
          id: data[key].id,
          date: formatDate(data[key].data),
          costumer: data[key].nome,
          total: data[key].total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          }),
        });
      }

      setOrders(loadedOrders);
    } catch (err) {
      setMessage(err.message);
    }
  }, []);

  useEffect(() => {
    fetchOrdersHandler();
  }, [fetchOrdersHandler]);

  const ordersList = orders ? (
    orders.map((order) => {
      return (
        <li key={order.id} className={classes["list-item"]}>
          <div>
            <span className={classes.span}>ID</span>
            <h2>{order.id}</h2>
          </div>
          <div>
            <span className={classes.span}>Data</span>
            <h2>{order.date}</h2>
          </div>
          <div>
            <span className={classes.span}>Cliente</span>
            <h2>{order.costumer}</h2>
          </div>
          <div>
            <span className={classes.span}>Total</span>
            <h2>{order.total}</h2>
          </div>
        </li>
      );
    })
  ) : (
    <li>Nenhum pedido encontrado.</li>
  );

  return <ul>{ordersList}</ul>;
};

export default Order;
