import classes from "./Private.module.css";

import { Outlet } from "react-router-dom";

import { useDashboardAccessQuery } from "../../features/auth/authSlice";

const Private = () => {
  const { isSuccess, isError, error, refetch } = useDashboardAccessQuery({
    force: true,
  });

  let content;

  if (isSuccess) {
    content = <Outlet />;
  } else if (isError) {
    content = <h1 className={classes.status}>{error.data}</h1>;
  }

  return content;
};

export default Private;
