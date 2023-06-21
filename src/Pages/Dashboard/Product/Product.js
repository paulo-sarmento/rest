import React from "react";

import classes from "./Product.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Product = ({ id, img, name, price, onEdit, onRemove }) => {
  const onClickEditProductHandler = (e) => {
    onEdit(id);
  };

  const onClickDeleteProductHandler = (e) => {
    onRemove(id);
  };

  return (
    <>
      <li key={id} className={classes["list-item"]}>
        <div className={classes["wrapper-btn"]}>
          <button
            className={`${classes.btn} ${classes["btn-edit"]}`}
            onClick={onClickEditProductHandler}
          >
            <FontAwesomeIcon icon={solid("file-pen")} />
          </button>
          <button
            className={`${classes.btn} ${classes["btn-delete"]}`}
            onClick={onClickDeleteProductHandler}
          >
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
    </>
  );
};

export default Product;
