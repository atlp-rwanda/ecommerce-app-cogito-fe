import axios from 'axios';

const baseURL = import.meta.env.VITE_BN_APP_API_BASE_URL;
const URL = axios.create({
  baseURL,
});

export default URL;
