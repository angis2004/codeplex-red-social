
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true, // Hace los SVG más pequeños
      },
    })
  ],
  server: {
    port: 3000,
    open: true
  }
})