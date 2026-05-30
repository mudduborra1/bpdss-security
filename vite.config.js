import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // ✅ FIXED: Changed 'localhost' to '127.0.0.1' to bypass IPv6 resolution bugs
        target: "http://127.0.0.1:8069", 
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost", 
      },
    },
  },
});
