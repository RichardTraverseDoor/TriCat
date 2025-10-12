# TriCat Frontend

Dieses Projekt wurde mit [Vite](https://vitejs.dev/) erstellt und nutzt
[Vue 3](https://vuejs.org/), [Tailwind CSS](https://tailwindcss.com/) sowie die
[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)-Integration.

## Entwicklung

```bash
npm install
npm run dev
```

Der Dev-Server ist standardmäßig unter `http://localhost:5173` erreichbar.

## Produktion bauen

```bash
npm run build
npm run preview
```

Der Build-Befehl führt zuerst einen Typ-Check via `vue-tsc` aus und erstellt im
Anschluss das optimierte Produktions-Bundle.
