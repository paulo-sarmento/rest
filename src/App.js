import React from "react";

import "./reset.css";
import classes from "./App.module.css";

import { Outlet, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" ? (
        <div className={classes.app}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <div className={classes.app}>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
