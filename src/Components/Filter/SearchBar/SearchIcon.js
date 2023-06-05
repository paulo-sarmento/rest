import React from "react";

import classes from "./SearchIcon.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const SearchIcon = ({ onClickSearch }) => {
  return (
    <>
      <div className={classes.icon} onClick={onClickSearch}>
        <FontAwesomeIcon icon={solid("magnifying-glass")} />
      </div>
    </>
  );
};

export default SearchIcon;
