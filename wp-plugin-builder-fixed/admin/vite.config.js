import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],

  // لتسهيل الاستيراد: import X from "@/components/X"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".json"],
  },

  root: path.resolve(__dirname),
  base: "./",

  build: {
    outDir: path.resolve(__dirname, "build"),
    emptyOutDir: true,
    sourcemap: false,

    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        // نصنع ملف JS واضح لووردبريس
        entryFileNames: "admin.js",
        // نصنع ملف CSS ثابت
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith(".css")) {
            return "admin.css";
          }
          return "[name].[ext]";
        },
      },
    },
  },

  server: {
    port: 5173,
    strictPort: true,
    open: false,
    hmr: {
      host: "localhost",
    },
  },
});
