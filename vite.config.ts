import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    // Target modern browsers — smaller output, no polyfill bloat
    target: "es2020",
    // Warn if a chunk exceeds 400 KB
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        // Split vendor libs into separate cached chunks
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": [
            "@tanstack/react-router",
            "@tanstack/react-query",
          ],
          "vendor-ui": ["lucide-react"],
        },
      },
    },
    // Minify CSS aggressively
    cssMinify: true,
    // Enable minification
    minify: "esbuild",
  },
});

