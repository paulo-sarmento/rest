import React, { useState, useEffect, useCallback } from "react";

import Context from "./Context";

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const [user, setUser] = useState({ id: "", name: "", mail: "" });
  const [isSignIn, setIsSignIn] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchProductsHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/");

      const data = await response.json();

      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: data[key].id,
          img: data[key].img,
          name: data[key].nome,
          price: data[key].preco,
          amount: data[key].qtd,
        });
      }

      setProducts(loadedProducts);
    } catch (err) {
      setMessage(err.message);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]); // [] determina quando essa função de useEffect será executada, somente será executada novamente se as dependências listadas dentro do [] mudar

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
    setIsSignIn(true);
  };

  return (
    <Context.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        filterProducts,
        onLogin,
        isSignIn,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
