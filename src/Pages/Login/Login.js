import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";

import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";

import Context from "../../Components/Context/Context";

const Login = () => {
  const { onLogin } = useContext(Context);

  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onEmailChangeHandler = (e) => {
    setMail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const req = async () => {
      const url = "http://localhost:3001/signin";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

  const onClickRegisterHandler = () => {
    navigate("/register");
  };

  return (
    <Container className={classes.modal}>
      <Logo />
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <fieldset>
            <legend className={classes.title}>Login</legend>
            <div className={classes.input}>
              <label htmlFor="email-address" className={classes.label}>
                Email
              </label>
              <input
                className={classes["input-field"]}
                type="email"
                name="email-address"
                id="email-address"
                value={mail}
                onChange={onEmailChangeHandler}
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
          <p className={classes.error}>{error}</p>
          <div className={classes["btn-field"]}>
            <button type="submit" className={classes.btn}>
              LOGIN
            </button>
          </div>
        </form>
        <div className={classes["btn-field"]}></div>
        <div className={classes["wrapper-btn"]}>
          <p>Não possui uma conta?</p>
          <button
            onClick={onClickRegisterHandler}
            className={classes["btn-register"]}
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
