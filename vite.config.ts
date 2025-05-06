import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { errorReporter, canvasMode } from "@getmocha/vite-plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    
    react(),
    errorReporter({
      appId: "0196a334-9142-7bb6-8082-f48854ca85ae",
      env: process.env.NODE_ENV,
      showWatermark: process.env.SHOW_WATERMARK,
    }),
  ],
  server: {
    allowedHosts: true,
  },
});
