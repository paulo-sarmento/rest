import React, { useContext, useState } from "react";

import classes from "./Login.module.css";

import Context from "../Context/context";

import Container from "../Layout/Container";
import Logo from "../UI/Logo";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

import { createPortal } from "react-dom";

const Login = ({ showLogin, showRegister, showForgotPassword }) => {
  const ctx = useContext(Context);

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
        ctx.onLogin(data);
        showLogin(false);
        ctx.onRouteChangeHandler("main");
      }
    };

    req();
  };

  const onClickRegisterHandler = () => {
    showRegister(true);
    showLogin(false);

    return (
      <>
        {createPortal(
          <Register showRegister={showRegister} />,
          document.getElementById("root")
        )}
      </>
    );
  };

  const onClickForgotPasswordHandler = () => {
    showLogin(false);
    showForgotPassword(true);

    return (
      <>
        {createPortal(
          <ForgotPassword
            showLogin={showLogin}
            showForgotPassword={showForgotPassword}
          />,
          document.getElementById("root")
        )}
      </>
    );
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
        <div className={classes["btn-field"]}>
          <button
            className={classes["btn-password"]}
            onClick={onClickForgotPasswordHandler}
          >
            Esqueceu a senha?
          </button>
        </div>
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
