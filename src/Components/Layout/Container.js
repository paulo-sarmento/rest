import React, { Component } from "react";
import classes from "./Container.module.css";

const Container = ({ className, children }) => {
  const classList = [classes.wrapper, className].join(" ");

  return <div className={classList}>{children}</div>;
};

export default Container;
