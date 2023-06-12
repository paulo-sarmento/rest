import { createContext } from "react";

const CartContext = createContext({
  items: [],
  Orders: [],
  totalPrice: 0,
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  makeOrder: () => {},
});

export default CartContext;
