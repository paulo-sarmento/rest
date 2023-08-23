import classes from "./SearchBar.module.css";
import { useRef } from "react";

const Search = ({ filter }) => {
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
    </>
  );
};

export default Search;
