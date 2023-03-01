//managed cart-context data and provide that context to all components
//that wants access to it

import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedtotalPrice = state.totalPrice + action.item.price * action.item.amount;
    const updatedtotalAmount = state.totalAmount + action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedExistingCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedExistingCartItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalPrice: updatedtotalPrice,
      totalAmount: updatedtotalAmount,
    };
  } else if (action.type === "REMOVE") {
    let totalPrice;
    let totalAmount;
    let updatedItems = [...state.items];

    state.items.filter((item, index) => {
      if (item.id === action.id) {
        totalPrice = state.totalPrice - item.price;
        totalAmount = state.totalAmount--;
        if (item.amount > 1) {
          item.amount--;
        } else {
          updatedItems.splice(index, 1);
        }
      }
    });
    return {
      items: updatedItems,
      totalPrice,
      totalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
