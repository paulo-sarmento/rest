import React, { useState } from "react";

import classes from "./EditProduct.module.css";

import Container from "../../../../Components/Layout/Container/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const EditProduct = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  const { id, nome, preco, img } = product;

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onPriceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const onInputImageChangeHandler = (e) => {
    let file = e.target.files[0];
    setFile(file);
    setImageURL(URL.createObjectURL(file));
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
        >
          <fieldset>
            <legend className={classes.title}>EDITAR PRODUTO</legend>
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
                src={`http://localhost:3001/${img}`}
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
                onChange={onNameChangeHandler}
                value={nome}
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
                value={preco}
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

export default EditProduct;
