import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/",
      transformResponse: (responseData) => {
        const loadedProducts = responseData.map((product) => {
          let formattedProduct = {
            id: product.id,
            name: product.nome,
            price: product.preco,
            img: `http://localhost:3001/${product.img}`,
            inactive: product.inativo,
          };

          return formattedProduct;
        });

        return loadedProducts;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map((id) => ({ type: "Product", id }))]
          : ["Product"],
    }),
  }),
});

export const selectProductsResult = apiSlice.endpoints.getProducts.select();

const emptyProducts = [];

//returns the array of products from the cache result
export const selectAllProducts = createSelector(
  selectProductsResult,
  (productsResult) => productsResult?.data ?? emptyProducts
);

export const { useGetProductsQuery } = extendedApiSlice;
