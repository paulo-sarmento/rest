export const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = new Date(date).toLocaleString("pt-BR", options);

  return formattedDate;
};

export const formatPrice = (price) => {
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formattedPrice;
};

export const normalizeString = (str) => {
  // remove espaços em branco no início e no final
  str = str.trim();
  // remove acentos
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // converte para minúsculas
  str = str.toLowerCase();
  // retorna a string normalizada
  return str;
};
