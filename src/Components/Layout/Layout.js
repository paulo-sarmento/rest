import classes from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Private from "../../Pages/Private/Private";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  let layout = (
    <div className={classes.app}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

  if (pathname === "/login" || pathname === "/register") {
    layout = (
      <div className={classes.app}>
        <Outlet />
      </div>
    );
  } else if (pathname.includes("dashboard")) {
    layout = (
      <div className={classes.app}>
        <Private>
          <Outlet />
        </Private>
      </div>
    );
  }

  return layout;
};

export default Layout;
