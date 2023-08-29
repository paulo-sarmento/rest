import { apiSlice } from "../api/apiSlice";
import { formatDate } from "../../utils/formatUtils";

export const extendedApiOrdersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query({
      query: (id) => ({
        url: `/orders-by-user?user=${id}`,
      }),
      transformResponse: (responseData) => {
        const groupedArr = groupByOrder(responseData);

        return groupedArr.reverse();
      },
      providesTags: [{ type: "Orders" }],
    }),
    getOrders: builder.query({
      query: () => "/orders",
      transformResponse: (responseData) => {
        let totalPrice = 0;

        responseData.map((order) => {
          totalPrice += order.total;

          return order;
        });

        responseData.totalPrice = totalPrice;

        return responseData;
      },
      providesTags: [{ type: "Orders" }],
    }),
  }),
});

const groupByOrder = (arr) => {
  return arr.reduce((result, item) => {
    const orderId = item.id_pedido;

    if (!result[orderId]) {
      result[orderId] = {
        id: orderId,
        data: formatDate(item.data),
        products: [],
        totalPrice: 0,
      };
    }

    result[orderId].products.push({
      name: item.nome,
      amount: item.qtd,
      price: item.preco,
    });

    result[orderId].totalPrice = item.total;

    return result;
  }, []);
};

export const { useGetOrdersByUserQuery, useGetOrdersQuery } =
  extendedApiOrdersSlice;
