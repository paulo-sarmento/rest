import React, { useState, useCallback } from "react";

import classes from "./AddProduct.module.css";

import Container from "../../../../Components/Layout/Container/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const AddProduct = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  const onProductChangeHandler = (e) => {
    setProduct(e.target.value);
  };

  const onPriceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const onInputImageChangeHandler = (e) => {
    let file = e.target.files[0];
    setFile(file);
    setImageURL(URL.createObjectURL(file));
  };

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", file);

    URL.revokeObjectURL(file);

    setFile(null);

    const req = async () => {
      const up = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const { img } = await up.json();

      const res = await fetch("http://localhost:3001/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          price,
          img,
        }),
      });
    };

    req();

    setProduct("");
    setImageURL("");
    setPrice("");
  };

  return (
    <Container className={classes.bg}>
      <div className={classes.modal}>
        <span onClick={onClose} className={classes["close-btn"]}>
          <FontAwesomeIcon icon={solid("x")} />
        </span>
        <form
          className={classes.form}
          method="post"
          encType="multipart/form-data"
          onSubmit={onSubmitFormHandler}
        >
          <fieldset>
            <legend className={classes.title}>CADASTRAR PRODUTO</legend>
            <div className={classes["wrapper-input"]}>
              <label
                htmlFor="img"
                className={`${classes.label} ${classes["label-file"]}`}
              >
                Escolha uma imagem
                <span className={classes["icon-wrapper"]}>
                  <FontAwesomeIcon
                    icon={solid("file")}
                    className={classes.icon}
                  />
                  <span className={classes["file-info"]}>
                    nenhum arquivo selecionado...
                  </span>
                </span>
              </label>
              <input
                className={classes.input}
                type="file"
                name="img"
                id="img"
                accept="image/*"
                onChange={onInputImageChangeHandler}
              />
            </div>
            <div className={classes["wrapper-preview"]}>
              <img
                src={
                  imageURL
                    ? imageURL
                    : "http://localhost:3000/assets/img/default.jpg"
                }
                className={classes["img-preview"]}
              />
            </div>
            <div className={classes["wrapper-input"]}>
              <label htmlFor="product" className={classes.label}>
                Nome
              </label>
              <input
                className={classes.input}
                type="text"
                name="product"
                id="product"
                onChange={onProductChangeHandler}
                value={product}
                required
              />
            </div>
            <div className={classes["wrapper-input"]}>
              <label htmlFor="price" className={classes.label}>
                Preço
              </label>
              <input
                className={classes.input}
                type="number"
                step="any"
                name="price"
                id="price"
                onChange={onPriceChangeHandler}
                value={price}
                required
              />
            </div>
          </fieldset>
          {/* <p className={classes.error}>{error}</p> */}
          <div>
            <button type="submit" className={classes.btn}>
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddProduct;
