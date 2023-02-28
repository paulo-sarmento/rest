import React, { useState } from "react";

const DUMMY_PRODUCTS = [
  {
    id: "m1",
    img: "../../assets/img/coca.png",
    name: "Coca Cola lata 350ml",
    price: 2.44,
  },
  {
    id: "m2",
    img: "../../assets/img/fanta-laranja.png",
    name: "Fanta Laranja lata 350ml",
    price: 3.9,
  },
  {
    id: "m3",
    img: "../../assets/img/guarana.jpg",
    name: "Guarana Antarctica lata 350ml",
    price: 2.78,
  },
  {
    id: "m4",
    img: "../../assets/img/orange-juice.png",
    name: "Suco de laranja copo 300ml",
    price: 4.99,
  },
  {
    id: "m5",
    img: "../../assets/img/peps.png",
    name: "Peps lata 350ml",
    price: 2.09,
  },
  {
    id: "m6",
    img: "../../assets/img/water-bottle.png",
    name: "Água mineral 350ml",
    price: 1.99,
  },
];

const Context = React.createContext({
  DUMMY_PRODUCTS: DUMMY_PRODUCTS,
  isFilteredProducts: (filter) => {},
  filteredProducts: null,
  setFilteredProducts: null,
  onRouteChangeHandler: (route) => {},
  route: "home",
  setRoute: "home",
});

export const ContextProvider = (props) => {
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [route, setRoute] = useState("home");

  const onRouteChangeHandler = (route) => {
    setRoute(route);
  };

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

  const isFilteredProducts = (filter) => {
    const newFilteredProducts = DUMMY_PRODUCTS.filter((product) =>
      normalizeString(product.name).includes(normalizeString(filter))
    );
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <Context.Provider
      value={{
        DUMMY_PRODUCTS,
        isFilteredProducts,
        filteredProducts,
        setFilteredProducts,
        onRouteChangeHandler,
        route,
        setRoute,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
