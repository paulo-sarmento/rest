import React, { useState, useEffect, useCallback } from "react";

import Context from "./Context";

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [inactiveProducts, setInactiveProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const [user, setUser] = useState(() => {
    const storedValue = sessionStorage.getItem("user");

    return storedValue
      ? JSON.parse(storedValue)
      : { id: "", name: "", mail: "" };
  });

  const [isSignIn, setIsSignIn] = useState(() => {
    const storedValue = sessionStorage.getItem("isSignIn");

    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [message, setMessage] = useState(null);

  const fetchProductsHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/");

      const data = await response.json();

      let inactive = [];
      let active = [];
      let loadedProducts = [];

      data.forEach((product) => {
        if (product.inativo) {
          return inactive.push({
            id: product.id,
            img: `http://localhost:3001/${product.img}`,
            name: product.nome,
            price: product.preco,
            amount: product.qtd,
          });
        }

        return active.push({
          id: product.id,
          img: `http://localhost:3001/${product.img}`,
          name: product.nome,
          price: product.preco,
          amount: product.qtd,
        });
      });

      loadedProducts.push(inactive, active);

      setInactiveProducts(loadedProducts[0]);
      setProducts(loadedProducts[1]);
    } catch (err) {
      setMessage(err.message);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler();
  }, []); // [] determina quando essa função de useEffect será executada, somente será executada novamente se as dependências listadas dentro do [] mudar

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

  const filterProducts = (filter) => {
    const newFilteredProducts = products.filter((product) =>
      normalizeString(product.name).includes(normalizeString(filter))
    );

    setFilteredProducts(newFilteredProducts);
  };

  const onLogin = (user) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));

    setIsSignIn(true);
    sessionStorage.setItem("isSignIn", JSON.stringify("true"));
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = new Date(date).toLocaleString("pt-BR", options);
    return formattedDate;
  };

  return (
    <Context.Provider
      value={{
        products,
        inactiveProducts,
        filteredProducts,
        setFilteredProducts,
        filterProducts,
        onLogin,
        isSignIn,
        user,
        formatDate,
        normalizeString,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
