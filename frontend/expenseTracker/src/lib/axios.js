import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

console.log("==========");
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
console.log("API_URL =", API_URL);
console.log("==========");

const api = axios.create({
  baseURL: API_URL,
});

export default api;