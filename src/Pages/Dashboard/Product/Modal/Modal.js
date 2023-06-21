import React, { useState, useEffect } from "react";

import classes from "./Modal.module.css";

import Container from "../../../../Components/Layout/Container/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Modal = ({ isOpen, onClose, editingProduct, setEditingProduct }) => {
  if (!isOpen) return null;

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //se o objeto editingProduct não for vazio, altera o estado de name e price para seus valores
  useEffect(() => {
    if (Object.values(editingProduct).length > 0) {
      setName(editingProduct.nome);
      setPrice(editingProduct.preco);
    }
  }, [editingProduct]);

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onPriceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  //pega a imagem do input do usuário e salva no state file e cria uma URL da imagem para o preview
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

    let id = editingProduct.id;

    const req = async () => {
      let img;
      /* 
      se tiver imagem será feita o upload, se não, quer dizer que o usuário
      esta editando o produto, visto que a imagem é obrigatória para cadastro.
      */
      if (file) {
        const up = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        img = await up.json();
      } else {
        img = editingProduct.img;
      }

      const res = await fetch("http://localhost:3001/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          price,
          img,
        }),
      });
    };

    req();

    setName("");
    setImageURL("");
    setPrice("");
    setEditingProduct({});
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
            <legend className={classes.title}>
              {editingProduct == false ? `CADASTRAR PRODUTO` : `EDITAR PRODUTO`}
            </legend>
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
                {...(Object.values(editingProduct).length === 0
                  ? { required: "required" }
                  : {})}
              />
              {/* caso o usuário não esteja editando o produto o input img será required */}
            </div>
            <div className={classes["wrapper-preview"]}>
              <img
                src={
                  imageURL
                    ? imageURL
                    : Object.values(editingProduct).length === 0
                    ? "http://localhost:3000/assets/img/default.jpg"
                    : `http://localhost:3001/${editingProduct.img}`
                }
                className={classes["img-preview"]}
              />
            </div>
            <div className={classes["wrapper-input"]}>
              <label htmlFor="name" className={classes.label}>
                Nome
              </label>
              <input
                className={classes.input}
                type="text"
                name="name"
                id="name"
                onChange={onNameChangeHandler}
                value={name}
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

export default Modal;
