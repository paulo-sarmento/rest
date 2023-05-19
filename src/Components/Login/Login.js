import React, { useContext, useState } from "react";
import classes from "./Login.module.css";

import Logo from "../UI/Logo";
import Container from "../Layout/Container";

import Context from "../Context/context";

function Login() {
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
          <legend>Login</legend>
          <div>
            <label htmlFor="email-address">Email</label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              value={mail}
              onChange={onEmailChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
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
        <p>{error}</p>
        <div>
          <button type="submit">LOGIN</button>
        </div>
        <div>
          <p>Esqueceu a senha?</p>
        </div>
        <div>
          <p>Não possui uma conta?</p>
          <p>Cadastre-se</p>
        </div>
      </form>
    </Container>
  );
}

export default Login;
