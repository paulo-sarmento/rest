import "./reset.css";
import classes from "./App.module.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Private from "./Pages/Private/Private";

import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();

  let content = (
    <div className={classes.app}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

  if (pathname === "/login" || pathname === "/register") {
    content = (
      <div className={classes.app}>
        <Outlet />
      </div>
    );
  } else if (pathname === "/dashboard") {
    content = (
      <div className={classes.app}>
        <Private>
          <Outlet />
        </Private>
      </div>
    );
  }

  return <>{content}</>;
};

export default App;
