import classes from "./RegisterProduct.module.css";

import Container from "../../../../Components/Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

import { useRegisterProductMutation } from "../../../../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const onNameChangeHandler = (e) => setName(e.target.value);
  const onPriceChangeHandler = (e) => setPrice(e.target.value);

  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");

  //pega a imagem do input do usuário e salva no state file e cria uma URL da imagem para o preview
  const onInputImageChangeHandler = (e) => {
    let file = e.target.files[0];
    setFile(file);
    console.log(file);
    setImageURL(URL.createObjectURL(file));
  };

  const [register] = useRegisterProductMutation();

  const navigate = useNavigate();

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    let img = "http://localhost:3001/static/default.jpg";

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
      await register({
        name,
        price,
        img,
      }).unwrap();

      toast.success("Produto cadastrado com sucesso!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      setName("");
      setPrice("");
      setFile("");
      setImageURL("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } catch (err) {
      console.error(err.data);
    }
  };

  return (
    <div className={classes.container}>
      <Container className={classes.wrapper}>
        <form className={classes.form} onSubmit={onFormSubmitHandler}>
          <fieldset className={classes["form-wrapper"]}>
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
                    {file?.name ? file.name : "nenhum arquivo selecionado..."}
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
                    : "http://localhost:3001/static/default.jpg"
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
            <div>
              <button type="submit" className={classes.btn}>
                SALVAR
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
export default AddProduct;
