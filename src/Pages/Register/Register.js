import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Register.module.css";

import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";

import Context from "../../Components/Context/Context";

const Register = () => {
  const { onLogin } = useContext(Context);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onEmailChangeHandler = (e) => {
    setMail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const req = async () => {
      const url = "http://localhost:3001/register";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      }

      if (data.id) {
        onLogin(data);
        navigate("/");
      }
    };

    req();
  };

  const onClickLoginHandler = () => {
    navigate("/login");
  };

  return (
    <Container className={classes.modal}>
      <Logo />
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
          <p>{error}</p>
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
    </Container>
  );
};

export default Register;
