import classes from "./EditProduct.module.css";

import Container from "../../../../Components/Layout/Container/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductById } from "../../../../features/products/productsSlice";
import { useUpdateProductMutation } from "../../../../features/products/productsSlice";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = useProductById(Number(productId));
  const [updateProduct] = useUpdateProductMutation();

  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);

  const onNameChangeHandler = (e) => setName(e.target.value);
  const onPriceChangeHandler = (e) => setPrice(e.target.value);

  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");

  //pega a imagem do input do usuário e salva no state file e cria uma URL da imagem para o preview
  const onInputImageChangeHandler = (e) => {
    let file = e.target.files[0];
    setFile(file);
    setImageURL(URL.createObjectURL(file));
  };

  const canSave =
    name === product?.name &&
    Number(price) === Number(product?.price) &&
    imageURL === "";

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    let img = product?.img;

    //se tiver um file cria um objeto formData e appenda o file, isso é feito para enviar multipart/form-data para o server

    if (file) {
      const formData = new FormData();
      formData.append("img", file);

      const up = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      img = await up.json();
    }

    try {
      await updateProduct({
        id: product.id,
        name,
        price,
        img,
      }).unwrap();

      setName("");
      setPrice("");
      setFile("");
      setImageURL("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.data);
    }
  };

  return (
    <Container className={classes.wrapper}>
      <form className={classes.form} onSubmit={onFormSubmitHandler}>
        <fieldset className={classes["form-wrapper"]}>
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
                  {file?.name ? file.name : "nenhum arquivo selecionado..."}
                </span>
              </span>
            </label>
            <input
              className={classes.input}
              type="file"
              name="img"
              id="img"
              onChange={onInputImageChangeHandler}
              accept="image/*"
            />
          </div>
          <div className={classes["wrapper-preview"]}>
            <img
              src={imageURL ? imageURL : product.imgSrc}
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
          <button type="submit" className={classes.btn} disabled={canSave}>
            SALVAR
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EditProduct;
