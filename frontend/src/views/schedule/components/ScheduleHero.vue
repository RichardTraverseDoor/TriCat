<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-emerald-900/40 p-6 text-emerald-50 shadow-[0_25px_45px_rgba(15,23,42,0.55)] sm:p-8"
  >
    <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-4 lg:max-w-xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-emerald-100/80 sm:text-xs">
          🐈‍⬛ Miauzige Organisation
        </span>
        <div class="space-y-3">
          <h1 class="text-3xl font-semibold sm:text-4xl">
            Plane deine Woche wie eine entspannte Studi-Katze
          </h1>
          <p class="text-base text-emerald-100/80 sm:text-lg">
            Hier kannst du jede Vorlesung, Übung oder Laborstunde festhalten und ihnen einen kuscheligen Platz geben.
            Dein Stundenplan schnurrt um dich herum und zeigt dir sofort, wo du als nächstes hin tapsen darfst.
          </p>
        </div>
        <div class="grid gap-3 text-[13px] text-emerald-100/80 sm:grid-cols-2 sm:text-sm">
          <div class="flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3">
            <span class="text-xl">🗓️</span>
            <div>
              <p class="text-[10px] uppercase tracking-[0.3em] text-emerald-200/70 sm:text-xs">Gespeicherte Termine</p>
              <p class="text-sm font-semibold text-emerald-50 sm:text-base">{{ entryCount }} miauzige Blöcke</p>
            </div>
          </div>
          <div class="flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3">
            <span class="text-xl">{{ busiestDayEmoji }}</span>
            <div>
              <p class="text-[10px] uppercase tracking-[0.3em] text-emerald-200/70 sm:text-xs">Beliebtester Tag</p>
              <p class="text-sm font-semibold text-emerald-50 sm:text-base">{{ busiestDayLabel }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative mt-4 flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-emerald-300/20 bg-slate-900/50 p-6 text-center text-sm text-emerald-100/80 shadow-inner sm:mt-6 lg:mt-0">
        <div class="absolute -top-8 h-16 w-16 rounded-full border border-emerald-300/40 bg-gradient-to-br from-emerald-400 to-teal-400 text-3xl text-emerald-950 shadow-lg shadow-emerald-900/40">
          <span class="flex h-full w-full items-center justify-center">🐾</span>
        </div>
        <h2 class="mt-10 text-base font-semibold text-emerald-50 sm:text-lg">Katzenhafte Tipps</h2>
        <ul class="space-y-3 text-left text-sm">
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-base">✨</span>
            <p>Plane bewusst Pausen für Stretching und Katzenbuckel ein – dein Rücken wird schnurren.</p>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-base">🎒</span>
            <p>Notiere Räume, damit du nicht wie eine Katze im Labyrinth suchst.</p>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-base">🧶</span>
            <p>Nutze Farben für jede Art des Termins, so verhedderst du dich nicht im Wollknäuel.</p>
          </li>
        </ul>
      </div>
    </div>

    <span class="pointer-events-none absolute -left-8 top-6 text-7xl text-emerald-200/20">🐱</span>
    <span class="pointer-events-none absolute bottom-4 right-6 text-6xl text-emerald-200/15">🪴</span>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  entryCount: number;
  busiestDayLabel: string;
  busiestDayEmoji: string;
}>();
</script>
