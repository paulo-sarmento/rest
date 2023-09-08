import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dpg-cjtn9i1gdgss738dt5hg-a.oregon-postgres.render.com",
    prepareHeaders: (headers) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user?.token) {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({}),
});
