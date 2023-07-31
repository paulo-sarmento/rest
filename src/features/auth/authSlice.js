import { apiSlice } from "../api/apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action) {
      return action.payload;
    },
    onLogout(state, action) {
      return initialState;
    },
  },
});

export const authSliceActions = authSlice.actions;

export const getUser = (state) => state.auth;

export const extendedApiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: { user },
      }),
    }),
  }),
});

export const { useLazyLoginQuery } = extendedApiAuthSlice;

export const { login } = apiSlice.endpoints;

export default authSlice.reducer;
