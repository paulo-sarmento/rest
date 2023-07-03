import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./ForgotPassword.module.css";

import Container from "../Layout/Container/Container";
import Context from "../Context/Context";

const ForgotPassword = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const { onLogout } = useContext(Context);

  const onEmailChangeHandler = (e) => {
    setMail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onNewPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const onConfirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onClickLoginHandler = () => {
    onLogout();

    navigate("/login");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const req = async () => {
      if (isValid === false) {
        const url = "http://localhost:3001/reset-password";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail,
            isValid,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else if (data.isValid) {
          setError("");
          setIsValid(data.isValid);
        }
      } else {
        const url = "http://localhost:3001/reset-password";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail,
            password,
            newPassword,
            confirmPassword,
            isValid,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setError(data.message);
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }
    };

    req();
  };

  return (
    <Container className={classes.modal}>
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <fieldset>
            <legend className={classes.title}>Esqueci a senha</legend>
            {isValid === true ? (
              <>
                <div className={classes.input}>
                  <label htmlFor="password" className={classes.label}>
                    Senha atual
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
                <div className={classes.input}>
                  <label htmlFor="newPassword" className={classes.label}>
                    Nova senha
                  </label>
                  <input
                    className={classes["input-field"]}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    onChange={onNewPasswordChangeHandler}
                    value={newPassword}
                    required
                  />
                </div>
                <div className={classes.input}>
                  <label htmlFor="confirmPassword" className={classes.label}>
                    Confirmar Senha
                  </label>
                  <input
                    className={classes["input-field"]}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={onConfirmPasswordChangeHandler}
                    value={confirmPassword}
                    required
                  />
                </div>
              </>
            ) : (
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
            )}
          </fieldset>
          <p className={classes.error}>{error}</p>
          <div className={classes["btn-field"]}>
            <button type="submit" className={classes.btn}>
              Redefinir senha
            </button>
          </div>
        </form>
        <div className={classes["wrapper-btn"]}>
          <button
            onClick={onClickLoginHandler}
            className={classes["btn-login"]}
          >
            Faça login
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
