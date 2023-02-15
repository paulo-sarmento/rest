import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./Components/store/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
