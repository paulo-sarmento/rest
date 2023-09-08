import classes from "./Layout.module.css";
import Header from "../Header/Header";
import HeaderDesktop from "../Header/HeaderDesktop";
import { useViewPortWidth } from "../../utils/hooks/size";
import Footer from "../Footer/Footer";
import Private from "../../Pages/Private/Private";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  const width = useViewPortWidth();
  let isDesktop = false;

  if (width >= 992) isDesktop = true;

  let layout = (
    <div className={classes.app}>
      {isDesktop ? <HeaderDesktop /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/change-password"
  ) {
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
