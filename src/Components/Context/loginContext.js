import React, { Children, createContext, useState } from "react";

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setSetShowForgotPassword] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        showForgotPassword,
        setSetShowForgotPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
