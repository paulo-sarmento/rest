import { apiSlice } from "../api/apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action) {
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    onLogout(state, action) {
      sessionStorage.removeItem("user");
      return initialState;
    },
  },
});

export const authSliceActions = authSlice.actions;

export const extendedApiAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: { user },
      }),
    }),
    dashboardAccess: builder.query({
      query: () => "/dashboard",
      keepUnusedDataFor: 0.0001,
    }),
  }),
});

export const { useLazyLoginQuery, useDashboardAccessQuery } =
  extendedApiAuthSlice;

export default authSlice.reducer;
