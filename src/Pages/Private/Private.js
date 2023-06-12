import React, { useContext, useEffect, useState } from "react";

import classes from "./Private.module.css";

import Context from "../../Components/Context/Context";

const Private = ({ children }) => {
  const { user } = useContext(Context);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    const req = async () => {
      const url = "http://localhost:3001/dashboard";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      setResponseStatus(res.status);
    };

    req();
  }, [user.token]);

  if (responseStatus === 200) return children;
  if (responseStatus === 401)
    return <h1 className={classes.status}>Não Autorizado</h1>;
  if (responseStatus === 403)
    return <h1 className={classes.status}>Token inválido</h1>;
};

export default Private;
