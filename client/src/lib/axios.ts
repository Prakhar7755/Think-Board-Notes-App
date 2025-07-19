import axios, {  AxiosInstance } from "axios";

const BASE_URL =
  import.meta.env.VITE_MODE === "development"
    ? `http://localhost:5001/api`
    : "/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default api;
