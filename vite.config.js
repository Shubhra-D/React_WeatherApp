import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  base:"/React_WeatherApp",
  build:{
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react(), tsconfigPaths()],
})