import classes from "./Filter.module.css";
import Container from "../Layout/Container/Container";
import SearchIcon from "./SearchBar/SearchIcon";
import SearchBar from "./SearchBar/SearchBar";

import { useState } from "react";
import { selectAllProducts } from "../../features/products/productsSlice";
import { useSelector } from "react-redux";

const normalizeString = (str) => {
  // remove espaços em branco no início e no final
  str = str.trim();
  // remove acentos
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // converte para minúsculas
  str = str.toLowerCase();
  // retorna a string normalizada
  return str;
};

const Filter = ({ filteredProducts }) => {
  const [activeCategory, setActiveCategory] = useState("Bebidas");
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const products = useSelector(selectAllProducts);

  const filterProducts = (filter) => {
    const newFilteredProducts = products.filter((product) =>
      normalizeString(product.name).includes(normalizeString(filter))
    );

    filteredProducts(newFilteredProducts);
  };

  const onClickHandler = (category) => {
    setActiveCategory(category);
  };

  const onClickSearchHander = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const onClickBackHandler = () => {
    setOpenSearchBar(!openSearchBar);

    filteredProducts(null);
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

  if (openSearchBar) {
    content = (
      <Container>
        <div className={classes.wrapper}>
          <SearchBar onClickBack={onClickBackHandler} filter={filterProducts} />
        </div>
      </Container>
    );
  }

  return <>{content}</>;
};

export default Filter;
