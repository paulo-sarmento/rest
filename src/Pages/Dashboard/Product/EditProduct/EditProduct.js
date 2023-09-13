import classes from "./EditProduct.module.css";

import Container from "../../../../Components/Layout/Container/Container";
import Spinner from "../../../../Components/UI/Spinner/Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductById } from "../../../../features/products/productsSlice";
import { useUpdateProductMutation } from "../../../../features/products/productsSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [isFetching, setIsFetching] = useState(false);

  //pega a imagem do input do usuário e salva no state file e cria uma URL da imagem para o preview
  const onInputImageChangeHandler = (e) => {
    let file = e.target.files[0];
    setFile(file);
    setImageURL(URL.createObjectURL(file));
  };

  const canSave =
    name === product?.name &&
    Number(price) === Number(product?.price) &&
    imageURL === "" &&
    !isFetching;

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    setIsFetching(true);

    let img = product?.img;

    try {
      //se tiver um file cria um objeto formData e appenda o file, isso é feito para enviar multipart/form-data para o server
      if (file) {
        const formData = new FormData();
        formData.append("img", file);

        const response = await fetch(
          "https://restmeal-api.onrender.com:443/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err);
        }

        img = await response.json();
      }

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

      toast.error(err.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className={classes.container}>
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
                src={imageURL ? imageURL : product.imgUrl}
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
            <div>
              <button
                type="submit"
                className={classes.btn}
                disabled={canSave || isFetching}
              >
                {isFetching ? <Spinner className={classes.loader} /> : "SALVAR"}
              </button>
            </div>
          </fieldset>
        </form>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </Container>
    </div>
  );
};

export default EditProduct;
