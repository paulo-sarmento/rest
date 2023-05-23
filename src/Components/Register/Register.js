import React, { useContext, useState } from "react";

import classes from "./Register.module.css";

import Container from "../Layout/Container";
import Logo from "../UI/Logo";

import Context from "../Context/context";

function Register() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const ctx = useContext(Context);

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
        ctx.onLogin(data);
        ctx.setShowLogin(false);
        ctx.onRouteChangeHandler("main");
      }
    };

    req();
  };

  return (
    <Container className={classes.modal}>
      <Logo />
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <fieldset>
          <legend>Cadastro</legend>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onNameChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="email-address">Email</label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              onChange={onEmailChangeHandler}
              value={mail}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onPasswordChangeHandler}
              value={password}
              required
            />
          </div>
        </fieldset>
        <div>
          <button type="submit">CADASTRAR</button>
        </div>
        <div>
          <p>Já possui uma conta?</p>
          <button>Login</button>
        </div>
      </form>
    </Container>
  );
}

export default Register;
