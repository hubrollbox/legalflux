
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';
import type { UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => ({
  server: {
    host: "::",
    port: 8080,
    https: {
      // Using default HTTPS configuration
      key: undefined,
      cert: undefined
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'LegalFlux',
        short_name: 'LegalFlux',
        description: 'Legal Management Platform',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-72x72.svg',
            sizes: '72x72',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-96x96.svg',
            sizes: '96x96',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-128x128.svg',
            sizes: '128x128',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-144x144.svg',
            sizes: '144x144',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-152x152.svg',
            sizes: '152x152',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-384x384.svg',
            sizes: '384x384',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        cleanupOutdatedCaches: true
      },
      devOptions: {
        enabled: true
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "terser", // Changed to use the specific allowed value
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}));
