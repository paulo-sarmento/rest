import classes from "./EditingProduct.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useState } from "react";

const EditingProduct = () => {
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

  //pega a imagem do input do usuário e salva no state file e cria uma URL da imagem para o preview
  const onInputImageChangeHandler = (e) => {
    let file = e.target.files[0];

    setFile(file);
    setImageURL(URL.createObjectURL(file));
  };

  return (
    <form className={classes.form} method="post" encType="multipart/form-data">
      <fieldset>
        <legend className={classes.title}>EDITAR PRODUTO</legend>
        <div className={classes["wrapper-input"]}>
          <label
            htmlFor="img"
            className={`${classes.label} ${classes["label-file"]}`}
          >
            Escolha uma imagem
            <span className={classes["icon-wrapper"]}>
              <FontAwesomeIcon icon={solid("file")} className={classes.icon} />
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
          />
        </div>
        <div className={classes["wrapper-preview"]}>
          <img
            // src={
            //   imageURL
            //     ? imageURL
            //     : Object.values(editingProduct).length === 0
            //     ? "http://localhost:3000/assets/img/default.jpg"
            //     : `http://localhost:3001/${editingProduct.img}`
            // }
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
      <div>
        <button type="submit" className={classes.btn}>
          SALVAR
        </button>
      </div>
    </form>
  );
};
export default EditingProduct;
