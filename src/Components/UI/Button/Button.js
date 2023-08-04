import React from "react";

import classes from "./Button.module.css";

const Button = ({ className, children, onClick, disabled }) => {
  const classList = [classes.btn, className].join(" ");

  return (
    <button className={classList} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
