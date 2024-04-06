import axios from "axios";

export const url = import.meta.env.VITE_API_SERVER_URL;

export const API = axios.create({
  baseURL: url,
});

export default API;
