import fs from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  // 🧭 Basis-Pfad auf RELATIV stellen, sonst 404 bei Deployment auf Plesk
  base: './',

  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'icons/icon.svg',
        'icons/maskable.svg'
      ],
      manifest: {
        name: 'TriCat',
        short_name: 'TriCat',
        description: 'Ein einfaches Vue 3 Frontend mit Tailwind CSS und PWA-Unterstützung.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        scope: './', // 👈 ebenfalls relativ!
        start_url: './',
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      },
      devOptions: {
        enabled: true // erlaubt PWA-Funktion auch im Dev-Modus
      }
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // Lokale Dev-Server-Konfiguration (optional für dein System)
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.existsSync(path.resolve(__dirname, 'cert/key.pem'))
        ? fs.readFileSync(path.resolve(__dirname, 'cert/key.pem'))
        : undefined,
      cert: fs.existsSync(path.resolve(__dirname, 'cert/cert.pem'))
        ? fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem'))
        : undefined
    }
  }
});
