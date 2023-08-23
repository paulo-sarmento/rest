import classes from "./Login.module.css";
import Container from "../../Components/Layout/Container/Container";
import Logo from "../../Components/UI/Logo/Logo";

import { useNavigate, useLocation } from "react-router-dom";
import { useLazyLoginQuery } from "../../features/auth/authSlice";
import { useState } from "react";
import { authSliceActions } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [login] = useLazyLoginQuery();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChangeHandler = (e) => setMail(e.target.value);
  const onPasswordChangeHandler = (e) => setPassword(e.target.value);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const loginQueryResponse = await login({ mail, password }).unwrap();

      dispatch(authSliceActions.onLogin(loginQueryResponse));

      if (state?.from === "cart") return navigate("/cart");

      navigate("/");
    } catch (err) {
      setError(err.data);
    }
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
