import React, { useState, useEffect, useCallback, createContext } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const [route, setRoute] = useState("home");

  const [user, setUser] = useState({ id: "", name: "", mail: "" });
  const [isSignIn, setIsSignIn] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchProductsHandler = useCallback(async () => {
    setMessage(null);
    try {
      const response = await fetch("http://localhost:3001/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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

  const onRouteChangeHandler = (route) => {
    setRoute(route);
  };

  const onLogin = (user) => {
    setUser(user);
    setIsSignIn(true);
  };

  const filterProducts = (filter) => {
    const newFilteredProducts = products.filter((product) =>
      normalizeString(product.name).includes(normalizeString(filter))
    );
    setFilteredProducts(newFilteredProducts);
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

  return (
    <Context.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        filterProducts,
        route,
        onRouteChangeHandler,
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
