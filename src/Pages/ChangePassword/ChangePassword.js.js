import classes from "./ChangePassword.module.css";

import Container from "../../Components/Layout/Container/Container";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { authSliceActions } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmailChangeHandler = (e) => setMail(e.target.value);
  const onPasswordChangeHandler = (e) => setPassword(e.target.value);
  const onNewPasswordChangeHandler = (e) => setNewPassword(e.target.value);
  const onConfirmPasswordChangeHandler = (e) =>
    setConfirmPassword(e.target.value);

  const [fetchPassword] = useChangePasswordMutation();

  const onClickLoginHandler = () => {
    navigate("/login");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isValid) {
        await fetchPassword({
          mail,
          password,
          newPassword,
          confirmPassword,
          isValid,
        }).unwrap();

        toast.success("senha alterada com sucesso!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });

        setPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          dispatch(authSliceActions.onLogout);
          navigate("/login");
        }, 2500);
      } else {
        await fetchPassword({ mail, isValid }).unwrap();
        setIsValid(true);
      }
    } catch (err) {
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

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    // const req = async () => {
    //   if (isValid === false) {
    //     const url = "http://localhost:3001/reset-password";

    //     const res = await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         mail,
    //         isValid,
    //       }),
    //     });

    //     const data = await res.json();

    //     if (data.error) {
    //       setError(data.error);
    //     } else if (data.isValid) {
    //       setError("");
    //       setIsValid(data.isValid);
    //     }
    //   } else {
    //     const url = "http://localhost:3001/reset-password";

    //     const res = await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         mail,
    //         password,
    //         newPassword,
    //         confirmPassword,
    //         isValid,
    //       }),
    //     });

    //     const data = await res.json();

    //     if (data.error) {
    //       setError(data.error);
    //       setPassword("");
    //       setNewPassword("");
    //       setConfirmPassword("");
    //     } else {
    //       setError(data.message);
    //       setPassword("");
    //       setNewPassword("");
    //       setConfirmPassword("");
    //     }
    //   }
    // };

    // req();
  };

  return (
    <Container className={classes.modal}>
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <fieldset>
            <legend className={classes.title}>Trocar a senha</legend>
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

export default ChangePassword;
