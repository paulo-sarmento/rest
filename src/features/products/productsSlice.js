import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/",
      transformResponse: (responseData) => {
        let activeProducts = [];
        let inactiveProducts = [];

        responseData.forEach((product) => {
          let formattedProduct = {
            id: product.id,
            name: product.nome,
            price: product.preco,
            img: product.img,
            imgSrc:
              product.img === "default.jpg"
                ? `http://localhost:3001/static/${product.img}`
                : `http://localhost:3001/${product.img}`,
            inactive: product.inativo,
          };

          if (product.inativo) {
            inactiveProducts.push(formattedProduct);
          } else {
            activeProducts.push(formattedProduct);
          }
        });

        return [activeProducts, inactiveProducts];
      },
      providesTags: (result, error, arg) =>
        result
          ? result
              .flat()
              .map((product) => ({ type: "Product", id: product.id }))
          : [{ type: "Product" }],
    }),
    registerProduct: builder.mutation({
      query: (product) => ({
        url: "/register-product",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: "/update-product",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    inactivateProduct: builder.mutation({
      query: (id) => ({
        url: "/inactivate-product",
        method: "POST",
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

export const useProductById = (productId) => {
  const { data } = extendedApiSlice.endpoints.getProducts.useQuery();

  const products = data.flat();

  const product = products.find((product) => product.id === productId);

  return product;
};

export const {
  useGetProductsQuery,
  useRegisterProductMutation,
  useUpdateProductMutation,
  useInactivateProductMutation,
} = extendedApiSlice;
