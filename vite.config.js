import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [], // sin íconos por ahora
      manifest: {
        name: "Caja Registradora Supermercado",
        short_name: "Caja",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [] // vacío sin íconos
      }
    })
  ]
});
