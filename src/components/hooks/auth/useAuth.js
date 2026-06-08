import { useContext } from "react";
// import { AuthContext } from "../../components/context/AuthProvider";
// If file is at src/context/AuthProvider.jsx
import { AuthContext } from "../../context/AuthProvider";


export const useAuth = () => useContext(AuthContext);
