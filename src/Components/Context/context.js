import React, { useState, useEffect, useCallback } from "react";

// const DUMMY_PRODUCTS = [
//   {
//     id: "m1",
//     img: "../../assets/img/coca.png",
//     name: "Coca Cola lata 350ml",
//     price: 2.44,
//   },
//   {
//     id: "m2",
//     img: "../../assets/img/fanta-laranja.png",
//     name: "Fanta Laranja lata 350ml",
//     price: 3.9,
//   },
//   {
//     id: "m3",
//     img: "../../assets/img/guarana.jpg",
//     name: "Guarana Antarctica lata 350ml",
//     price: 2.78,
//   },
//   {
//     id: "m4",
//     img: "../../assets/img/orange-juice.png",
//     name: "Suco de laranja copo 300ml",
//     price: 4.99,
//   },
//   {
//     id: "m5",
//     img: "../../assets/img/peps.png",
//     name: "Peps lata 350ml",
//     price: 2.09,
//   },
//   {
//     id: "m6",
//     img: "../../assets/img/water-bottle.png",
//     name: "Água mineral 350ml",
//     price: 1.99,
//   },
// ];

const Context = React.createContext();

export const ContextProvider = (props) => {
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [route, setRoute] = useState("home");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState({ id: "", name: "", mail: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const fetchProductsHandler = useCallback(async () => {
    setError(null);
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
      console.log(loadedProducts);
    } catch (error) {
      setError(error.message);
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
        setShowLogin,
        showLogin,
        setShowRegister,
        showRegister,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
