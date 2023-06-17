import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.pricecharting.com'
});

export default api;
