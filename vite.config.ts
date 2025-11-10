import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/widget.tsx"),
      name: "ChatBotWidget",
      fileName: "chatbot-widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        // 将CSS内联到JS中
        assetFileNames: (assetInfo) => {
          return assetInfo.name === "style.css"
            ? "chatbot-widget.css"
            : "[name].[ext]";
        },
      },
    },
    cssCodeSplit: false,
    minify: "esbuild",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
