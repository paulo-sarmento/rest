import classes from "./RegisterProduct.module.css";

import Container from "../../../../Components/Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useRef } from "react";

import { useRegisterProductMutation } from "../../../../features/products/productsSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const onNameChangeHandler = (e) => setName(e.target.value);
  const onPriceChangeHandler = (e) => setPrice(e.target.value);

  const formRef = useRef(null);
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [img, setImg] = useState("default.jpg");

  //pega a imagem do input do usuário e salva no state file e cria uma URL da imagem para o preview
  const onInputImageChangeHandler = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    setImageURL(URL.createObjectURL(selectedFile));
  };

  const [fetchProduct] = useRegisterProductMutation();

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      //se o usuário selecionou uma imagem, essa imagem será passada ao formData e será feita o upload da imagem ao servidor
      if (file) {
        const formData = new FormData();
        formData.append("img", file);

        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err);
        }

        setImg(await response.json());
      }

      await fetchProduct({
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

      formRef.current.reset();
      setName("");
      setPrice("");
      setFile("");
      setImageURL("");
      setImg("default.jpg");
    } catch (err) {
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

      formRef.current.reset();
      setFile("");
      setImageURL("");
      setImg("default.jpg");
    }
  };

  return (
    <div className={classes.container}>
      <Container className={classes.wrapper}>
        <form
          ref={formRef}
          className={classes.form}
          onSubmit={onFormSubmitHandler}
          encType="multipart/form-data"
        >
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
export default RegisterProduct;
