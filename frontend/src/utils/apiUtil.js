import axios from 'axios';

// base url for client side
const bonsaiApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export default bonsaiApi;
