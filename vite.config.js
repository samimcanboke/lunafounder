import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: "stream-browserify",
      buffer: "buffer",
      util: "util",
      crypto: "crypto-browserify",
      process: path.resolve(__dirname, './src/process-polyfill.js'),
    },
  },
  define: {
    "process.env": {},
    global: "globalThis",
    "process.platform": JSON.stringify(process.platform),
    "process.version": JSON.stringify(process.version),
    "process.browser": true,
  },
  optimizeDeps: {
    include: ["buffer", "stream-browserify", "util", "crypto-browserify"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["fsevents"],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       stream: "stream-browserify", // Alias stream to stream-browserify
//     },
//   },
//   optimizeDeps: {
//     include: ["stream"], // Ensure stream is bundled during development
//   },
//   server: {
//     host: "0.0.0.0", // tüm ağdan erişim izni verir
//     port: 5173,      // istersen farklı bir port da verebilirsin
//   },
// });
