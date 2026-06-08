import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8069", // Odoo backend
        changeOrigin: true,
        secure: false,
        // optional: rewrite path if needed
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/web": {
        target: "http://localhost:8069", // ✅ add this if you want to load Odoo images
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
