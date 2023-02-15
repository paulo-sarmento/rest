import React, { Component } from "react";
import classes from "./Container.module.css";

const Container = (props) => {
  const classList = [classes.wrapper, props.className].join(" ");

  return <div className={classList}>{props.children}</div>;
};

export default Container;
