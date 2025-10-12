<template>
  <div class="min-h-screen bg-gradient-to-br from-brand-dark to-slate-900">
    <main class="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-12 px-6 text-center">
      <header class="space-y-4">
        <span class="inline-flex items-center gap-2 rounded-full bg-brand-light/20 px-4 py-1 text-sm font-medium text-brand-light">
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
          PWA bereit
        </span>
        <h1 class="text-4xl font-bold md:text-5xl">Willkommen bei TriCat</h1>
        <p class="text-lg text-slate-300 md:text-xl">
          Dieses Projekt verwendet <strong class="text-brand-light">Vue 3</strong>,
          <strong class="text-brand-light">Tailwind CSS</strong> und ist als
          <strong class="text-brand-light">Progressive Web App</strong> vorbereitet.
        </p>
      </header>

      <section class="flex w-full flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl backdrop-blur">
        <h2 class="text-2xl font-semibold">Los geht's</h2>
        <ol class="space-y-3 text-left text-slate-300">
          <li><span class="font-semibold text-brand-light">npm install</span> im Verzeichnis <code class="rounded bg-slate-800 px-1">frontend</code></li>
          <li><span class="font-semibold text-brand-light">npm run dev</span>, um den lokalen Entwicklungsserver zu starten.</li>
          <li>
            Passe <code class="rounded bg-slate-800 px-1">src/App.vue</code> oder eigene Komponenten an und erlebe direktes
            Hot-Module-Replacement.
          </li>
        </ol>
      </section>

      <footer class="text-sm text-slate-500">
        Viel Spaß beim Bauen mit TriCat!
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
