import React, { useState, useContext } from "react";

import Container from "../Layout/Container/Container";
import classes from "./Filter.module.css";
import SearchIcon from "./SearchBar/SearchIcon";
import SearchBar from "./SearchBar/SearchBar";

import Context from "../Context/Context";

const Filter = () => {
  const [activeCategory, setActiveCategory] = useState("Bebidas");
  const [isActive, setIsActive] = useState(0);

  const { setFilteredProducts, products } = useContext(Context);

  const onClickHandler = (category) => {
    setActiveCategory(category);
  };

  const onClickSearchHander = () => {
    setIsActive(1);
  };

  const onClickBackHandler = () => {
    setIsActive(0);

    setFilteredProducts(products);
  };

  let content = (
    <Container>
      <div className={classes.wrapper}>
        <ul className={classes.list}>
          <li
            className={`${classes.list__item} ${
              activeCategory === "Bebidas" ? classes.active : ""
            }`}
            onClick={() => onClickHandler("Bebidas")}
          >
            <a className={classes.list__item__link}>Bebidas</a>
          </li>
          <li
            className={`${classes.list__item} ${
              activeCategory === "Comidas" ? classes.active : ""
            }`}
            onClick={() => onClickHandler("Comidas")}
          >
            <a className={classes.list__item__link}>Comidas</a>
          </li>
          <li
            className={`${classes.list__item} ${
              activeCategory === "Combos" ? classes.active : ""
            }`}
            onClick={() => onClickHandler("Combos")}
          >
            <a className={classes.list__item__link}>Combos</a>
          </li>
        </ul>
        <SearchIcon onClickSearch={onClickSearchHander} />
      </div>
    </Container>
  );

  if (isActive) {
    content = (
      <Container>
        <div className={classes.wrapper}>
          <SearchBar onClickBack={onClickBackHandler} />
        </div>
      </Container>
    );
  }

  return <>{content}</>;
};

export default Filter;
