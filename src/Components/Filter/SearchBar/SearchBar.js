import React, { useRef, useContext } from "react";
import classes from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Context from "../../store/context";

const Search = ({ onClickBack}) => {
  const ctx = useContext(Context);
  const inputRef = useRef();

  const onChangeHandler = () => {
    ctx.isFilteredProducts(inputRef.current.value);
  };

  return (
    <>
      <div className={classes["search-bar"]}>
        <input
          type="text"
          className={classes.input}
          placeholder="procurar..."
          ref={inputRef}
          onChange={onChangeHandler}
        ></input>
      </div>
      <div className={classes["back-icon"]} onClick={onClickBack}>
        <FontAwesomeIcon icon={solid("arrow-left")} />
      </div>
    </>
  );
};

export default Search;
