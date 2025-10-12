# TriCat

Dieses Repository enthält ein erstes Vue-3-Frontend im Ordner [`frontend`](frontend),
welches mit [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/) und
[PWA-Unterstützung](https://vite-pwa-org.netlify.app/) vorkonfiguriert ist.

## Entwicklung starten

```bash
cd frontend
npm install
npm run dev
```

Der Entwicklungsserver ist auf allen Interfaces verfügbar und kann so auch
außerhalb des Containers getestet werden. Die Service-Worker-Registrierung wird
über `virtual:pwa-register` automatisch vorgenommen.
