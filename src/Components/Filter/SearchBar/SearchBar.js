import React from "react";
import classes from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Search = ({ onClickBack }) => {
  return (
    <>
      <div className={classes["search-bar"]}>
        <input
          type="text"
          className={classes.input}
          placeholder="procurar..."
        ></input>
      </div>
      <div className={classes["back-icon"]} onClick={onClickBack}>
        <FontAwesomeIcon icon={solid("arrow-left")} />
      </div>
    </>
  );
};

export default Search;
