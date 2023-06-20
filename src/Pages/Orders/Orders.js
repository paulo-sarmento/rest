import React, { useContext, useState, useEffect, useCallback } from "react";

import classes from "./Orders.module.css";

import Container from "../../Components/Layout/Container/Container";

import Context from "../../Components/Context/Context";

import Logo from "../../Components/UI/Logo/Logo";

const Orders = () => {
  const [message, setMessage] = useState(null);
  const [orders, setOrders] = useState([]);

  const { user, formatDate } = useContext(Context);

  const fetchOrdersHandler = useCallback(async () => {
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3001/orders?user=${user.id}`);

      const data = await res.json();

      if (data.length === 0) {
        return setMessage("Nenhum pedido realizado");
      } else {
        const groupOrders = data.reduce((acc, obj) => {
          const id = obj.id_pedido;
          if (!acc[id]) {
            acc[id] = [];
          }
          acc[id].push(obj);
          return acc;
        }, {});

        //groupOrders agrupa os pedidos de mesmo ID, verificando se o acumulador possui alguma propriedade com o valor de id_pedido. se não possuir cria um
        //array novo e passa o objeto para ele. se já possui uma propriedade com o valor de id_pedido apenas passa o objeto para esse array

        let structuredOrders = [];

        for (let order in groupOrders) {
          const [{ id_pedido, data, total }] = groupOrders[order];

          const products = groupOrders[order].map((product) => {
            const { nome, qtd, preco } = product;

            return {
              name: nome,
              amount: qtd,
              price: preco,
            };
          });

          structuredOrders.push({
            id: id_pedido,
            data: new Date(data),
            products: products,
            totalPrice: total,
          });
        }

        //esse loop for in faz um loop pelas propriedades do objeto groupOrders, que nesse caso representam os ID's dos pedidos agrupados anteriormente.
        //via desestruturação é salvo o id_pedido, data e total do pedido e depois é feito um map no array retornando apenas nome, qtd e preco para criar um array
        //com os produtos desse meu pedido, logo após isso essa estrutura é passado para o meu array structuredOrders. ficando uma estrutura igual essa
        //[ id: , data: products: [{ nome: , amount: , price: }], totalPrice: ]. salvando todos os produtos do pedido separadamente em um array

        setOrders(structuredOrders);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  useEffect(() => {
    fetchOrdersHandler();
  }, [fetchOrdersHandler]); // [] determina quando essa função de useEffect será executada, somente será executada novamente se as dependências listadas dentro do [] mudar

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
        <>
          <section>
            <Logo />
            <h1 className={classes.title}>PEDIDOS</h1>
          </section>
          <section className={classes.section}>
            <Container>
              <ul className={classes.list}>{items}</ul>
            </Container>
          </section>
        </>
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
