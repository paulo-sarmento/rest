import React from "react";
import classes from "./SearchIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

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
