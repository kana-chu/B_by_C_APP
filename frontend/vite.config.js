import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // 必要なら個別 alias も追加可
      // "@Pages": path.resolve(__dirname, "src/Pages"),
      // "@Modules": path.resolve(__dirname, "src/Modules"),
      // "@Widgets": path.resolve(__dirname, "src/Widgets"),
    },
  },

  build: {
    directories: {
      output: "release", // ← Electron専用
    },
  },
});