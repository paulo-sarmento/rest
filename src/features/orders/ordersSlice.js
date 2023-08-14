import { apiSlice } from "../api/apiSlice";

export const extendedApiOrdersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (id) => ({
        url: `http://localhost:3001/orders?user=${id}`,
      }),
      transformResponse: (responseData) => {
        const groupedArr = groupByOrder(responseData);

        return groupedArr;
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
  }, {});
};

const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Date(date).toLocaleString("pt-BR", options);

  return formattedDate;
};

export const { useGetOrdersQuery } = extendedApiOrdersSlice;
