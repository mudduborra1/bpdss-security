import { useEffect } from "react";
import axios from "../../api/axiosClient";

export default function SessionTimeout() {

  useEffect(() => {
    let timeout;

    const logout = async () => {
      try {
        // Logout Odoo session
        await axios.post("/web/session/logout");
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear local storage
        localStorage.removeItem("auth");
        localStorage.removeItem("uid");
        localStorage.removeItem("username");

        // Redirect login
        window.location.href = "/login";
      }
    };

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        logout();
      }, 15 * 60 * 1000); // 15 minutes
    };

    // Activity listeners
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Start timer initially
    resetTimer();

    return () => {
      clearTimeout(timeout);

      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return null;
}