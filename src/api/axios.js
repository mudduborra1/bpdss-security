import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8069",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default instance;