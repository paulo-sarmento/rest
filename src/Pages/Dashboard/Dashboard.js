import React, { useContext } from "react";

import classes from "./Dashboard.module.css";

import Container from "../../Components/Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Logo from "../../Components/UI/Logo/Logo";

import Context from "../../Components/Context/Context";

const Card = ({ id, img, name, price }) => {
  return (
    <li key={id} className={classes["list-item"]}>
      <div className={classes["wrapper-btn"]}>
        <button className={`${classes.btn} ${classes["btn-edit"]}`}>
          <FontAwesomeIcon icon={solid("file-pen")} />
        </button>
        <button className={`${classes.btn} ${classes["btn-delete"]}`}>
          <FontAwesomeIcon icon={solid("x")} />
        </button>
      </div>
      <div className={classes["wrapper-item"]}>
        <div className={classes["wrapper-img"]}>
          <span className={classes.span}>img</span>
          <img src={img} alt="" className={classes.img} />
        </div>
        <div className={classes["wrapper-id"]}>
          <span className={classes.span}>id</span>
          <h2>{id}</h2>
        </div>
        <div className={classes["wrapper-name"]}>
          <span className={classes.span}>Nome</span>
          <h2>{name}</h2>
        </div>
        <div className={classes["wrapper-price"]}>
          <span className={classes.span}>Preço</span>
          <h2>
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
      </div>
    </li>
  );
};

const Dashboard = () => {
  const { products } = useContext(Context);

  const items = products.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
        amount={1}
      />
    );
  });

  return (
    <section>
      <Logo />
      <Container className={classes.container}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Produtos</h1>
          <button className={`${classes.btn} ${classes["btn-add"]}`}>
            add novo
          </button>
        </div>
        <ul className={classes.list}>{items}</ul>
      </Container>
    </section>
  );
};

export default Dashboard;
