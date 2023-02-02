import React, { Component } from "react";
import classes from "./Container.module.css";

const Container = (props) => {
  return <div className={classes.wrapper}>{props.children}</div>;
};

export default Container;
