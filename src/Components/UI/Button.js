import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, children, onClick}) => {
  const classList = [classes.btn, className].join(" ");

  return <button className={classList} onClick={onClick}>{children}</button>;
};

export default Button;
