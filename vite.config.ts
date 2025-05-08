import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Allow access from external networks
    port: 5173, // Change if needed
    strictPort: true, // Ensure the exact port is used
    allowedHosts: ['.ngrok-free.app'], // Allow all ngrok subdomains
    cors: true, // Allow cross-origin requests if needed
  }
});
