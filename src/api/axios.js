import axios from 'axios';
// const baseURL = import.meta.env.VITE_API_URL;
// const baseURL = "http://localhost:5173",

// export default axios.create({ baseURL });

// export const axiosPrivate = axios.create({
//     baseURL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });

// import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true
});

export default axiosPrivate;