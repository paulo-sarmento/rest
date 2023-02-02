import React, { Component } from "react";
import classes from "./Menu.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const Menu = () => {
  return (
    <div className={classes.menu}>
      <div className="menu_icon">
        <FontAwesomeIcon icon={solid('bars')} />
      </div>
    </div>
  );
};

export default Menu;
