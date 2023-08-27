import classes from "./Register.module.css";

import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [fetchUser] = useRegisterMutation();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChangeHandler = (e) => setName(e.target.value);
  const onEmailChangeHandler = (e) => setMail(e.target.value);
  const onPasswordChangeHandler = (e) => setPassword(e.target.value);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await fetchUser({ name, mail, password }).unwrap();

      toast.success("cadastro realizado!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setMail("");
      setPassword("");

      toast.error(err.data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const onClickLoginHandler = () => {
    navigate("/login");
  };

  return (
    <Container className={classes.modal}>
      <Container className={classes["logo-wrapper"]}>
        <Logo />
      </Container>
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <fieldset>
            <legend className={classes.title}>Cadastro</legend>
            <div className={classes.input}>
              <label htmlFor="name" className={classes.label}>
                Nome
              </label>
              <input
                className={classes["input-field"]}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onNameChangeHandler}
                required
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="email-address" className={classes.label}>
                Email
              </label>
              <input
                className={classes["input-field"]}
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChangeHandler}
                value={mail}
                required
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="password" className={classes.label}>
                Senha
              </label>
              <input
                className={classes["input-field"]}
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChangeHandler}
                value={password}
                required
              />
            </div>
          </fieldset>
          <div className={classes["btn-field"]}>
            <button type="submit" className={classes.btn}>
              CADASTRAR
            </button>
          </div>
        </form>
        <div className={classes["wrapper-btn"]}>
          <p>Já possui uma conta?</p>
          <button
            onClick={onClickLoginHandler}
            className={classes["btn-login"]}
          >
            Login
          </button>
        </div>
      </div>
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
  );
};

export default Register;
