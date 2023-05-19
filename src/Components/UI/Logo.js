import React, { useContext } from "react";
import classes from "./Logo.module.css";
import Context from "../Context/context";

const Logo = () => {
  const ctx = useContext(Context);

  const onClickHandler = () => {
    ctx.onRouteChangeHandler("home");
  };

  return (
    <div className={classes.logo} onClick={onClickHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="53"
        viewBox="0 0 80 53"
      >
        <g id="Logo" transform="translate(-35 -51)">
          <text
            id="Grub"
            transform="translate(35 72)"
            fill="#707070"
            font-size="22"
            font-family="Montserrat-Light, Montserrat"
            font-weight="300"
          >
            <tspan x="0" y="0">
              Grub
            </tspan>
          </text>
          <text
            id="Grab"
            transform="translate(37 96)"
            fill="#ff2415"
            font-size="32"
            font-family="Montserrat-Regular, Montserrat"
          >
            <tspan x="0" y="0">
              Grab
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
