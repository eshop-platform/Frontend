import axios from "axios";

const configuredBaseUrl = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

const API = axios.create({
  baseURL: configuredBaseUrl ? `${configuredBaseUrl}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
