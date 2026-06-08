// utils/auth.js

import  jwtDecode  from "jwt-decode";

export const setSession = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000; // exp is in seconds
  } catch {
    return false;
  }
};

export const logout = () => {
  localStorage.clear(); // clears all keys, including token
//   window.location.href = "/home";
};
