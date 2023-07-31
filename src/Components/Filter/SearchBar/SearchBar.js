import classes from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useRef } from "react";

const Search = ({ onClickBack, filter }) => {
  const inputRef = useRef();

  const onChangeHandler = () => {
    filter(inputRef.current.value);
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
