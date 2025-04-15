const END_POINT = 'https://bravo-backend-production-b096.up.railway.app';

export const environment = {
  production: true,
  BASE_API_URL: `${END_POINT}/api/`,
  API_URL_PRODUCTS: `${END_POINT}/api/produto`,
  API_URL_SEARCH_PRODUCTS: `${END_POINT}/api/search`,
  API_URL_USUARIO: `${END_POINT}/api/usuario`,
  API_URL_CARRINHO: `${END_POINT}/api/carrinho`,
  API_URL_ENDERECO: `${END_POINT}/api/endereco`,
  API_URL_PEDIDO: `${END_POINT}/api/pedido`,
  API_URL_AUTH_LOGIN: `${END_POINT}/api/auth/login`,
  API_URL_AUTH_VERIFY: `${END_POINT}/api/auth/verify`
};
