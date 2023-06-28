import React, { useEffect, useCallback, useState, useContext } from "react";

import classes from "./Order.module.css";

import Filter from "./Filter/Filter";

import Context from "../../../Components/Context/Context";

const Order = () => {
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [message, setMessage] = useState();

  const { formatDate, normalizeString } = useContext(Context);

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
          totalStringifyed: data[key].total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          }),
          total: data[key].total,
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

  let ordersList;
  let totalOrder = 0;
  let totalOrderStringifyed = "";

  if (orders) {
    if (filteredOrders) {
      ordersList = filteredOrders.map((order) => {
        totalOrder += order.total;
        totalOrderStringifyed = totalOrder.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });

        return (
          <>
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
                <h2>{order.totalStringifyed}</h2>
              </div>
            </li>
          </>
        );
      });
    } else {
      totalOrder = 0;
      ordersList = orders.map((order) => {
        totalOrder += order.total;
        totalOrderStringifyed = totalOrder.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });

        return (
          <>
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
                <h2>{order.totalStringifyed}</h2>
              </div>
            </li>
          </>
        );
      });
    }
  } else {
    return (
      <li className={classes["list-item-empty"]}>nenhum pedido realizado</li>
    );
  }

  const filter = (filter) => {
    const filteredOrders = orders.filter((order) =>
      normalizeString(order.costumer).includes(normalizeString(filter))
    );

    setFilteredOrders(filteredOrders);
  };

  return (
    <>
      <Filter onFilter={filter} />
      <ul>{ordersList}</ul>
      <div>
        <h1 className={classes.total}>
          Total Geral:{" "}
          <span className={classes["total-span"]}>{totalOrderStringifyed}</span>
        </h1>
      </div>
    </>
  );
};

export default Order;
