import classes from "./Filter.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Container from "../Layout/Container/Container";

import { normalizeString } from "../../utils/formatUtils";

const Filter = ({ products, filteredProducts }) => {
  const filterProducts = (filter) => {
    if (filter?.length) {
      const terms = filter.toLowerCase().split(" ");

      const newFilteredProducts = products.filter((product) =>
        terms.every((term) =>
          normalizeString(product.name).includes(normalizeString(term))
        )
      );

      filteredProducts(newFilteredProducts);
    } else {
      filteredProducts(null);
    }
  };

  return (
    <Container className={classes.wrapper}>
      <SearchBar filter={filterProducts} />
    </Container>
  );
};

export default Filter;
