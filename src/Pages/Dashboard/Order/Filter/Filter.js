import React, { useRef } from "react";

import classes from "./Filter.module.css";

const Filter = ({ onFilter }) => {
  const inputRef = useRef();

  const onChangeHandler = () => {
    onFilter(inputRef.current.value);
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

export default Filter;
