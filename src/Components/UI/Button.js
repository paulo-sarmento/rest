import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, children }) => {
  const classList = [classes.btn, className].join(" ");

  return <button className={classList}>{children}</button>;
};

export default Button;
