import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  totalPrice: 0,
  totalQuantity: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalQuantity++;

      let existingItem = state.entities[action.payload.id];

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartAdapter.addOne(state, action.payload);
      }
    },
    removeItem(state, action) {
      const item = state.entities[action.payload];

      item.quantity--;
      state.totalQuantity--;
      state.totalPrice -= item.price;

      if (item.quantity < 1) {
        cartAdapter.removeOne(state, action.payload);
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export const selectTotalPrice = createSelector(
  (state) => state.cart.totalPrice,
  (totalPrice) => totalPrice
);

export const selectTotalQuantity = createSelector(
  (state) => state.cart.totalQuantity,
  (totalQuantity) => totalQuantity
);

export const { selectAll: selectAllItems } = cartAdapter.getSelectors(
  (state) => state.cart
);

// export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
