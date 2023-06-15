import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://www.pricecharting.com/search-products?type=prices&q='
});
