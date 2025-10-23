<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-28 pt-16 sm:px-8 sm:pb-32 sm:pt-20 lg:px-12 lg:pt-24"
  >
    <span
      class="pointer-events-none absolute left-[8vw] top-12 text-5xl text-emerald-200/60 opacity-25 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      aria-hidden="true"
    >🐾</span>
    <span
      class="pointer-events-none absolute bottom-16 right-[6vw] text-5xl text-emerald-200/70 opacity-25 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      style="animation-delay: -4s"
      aria-hidden="true"
    >🐱</span>
    <span
      class="pointer-events-none absolute right-[12vw] top-1/2 text-5xl text-emerald-200/60 opacity-20 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      style="animation-delay: -8s"
      aria-hidden="true"
    >🧶</span>

    <main class="relative z-10 flex w-full max-w-3xl flex-col gap-12 text-center text-emerald-50 sm:gap-16">
      <header class="grid place-items-center gap-5">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-semibold text-emerald-100 shadow-[0_12px_28px_rgba(16,185,129,0.18)]"
        >
          ✨ Dein verspielter Lernbegleiter
        </span>
        <h1 class="font-heading text-4xl drop-shadow-[0_1px_0_rgba(148,163,184,0.6)] sm:text-5xl lg:text-6xl">
          Willkommen bei <span class="text-emerald-300">TriCat</span>
        </h1>
        <p class="max-w-xl text-base text-emerald-100/85 sm:text-lg">
          TriCat ist dafür da, <strong class="text-emerald-200">Dir</strong> den Alltag zu versüßen – organisiert,
          freundlich und mit einer Prise Katzenmagie.
        </p>
      </header>

      <section
        class="rounded-3xl border border-slate-400/20 bg-slate-900/70 p-6 text-left shadow-[0_25px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8"
      >
        <h2 class="mb-6 text-center font-heading text-3xl text-emerald-200 sm:mb-8 sm:text-4xl">Was TriCat alles kann</h2>
        <ol class="grid gap-4 sm:grid-cols-2">
          <li>
            <RouterLink
              to="/calendar"
              class="flex items-start gap-3 rounded-2xl border border-slate-400/15 bg-slate-900/60 p-4 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,185,129,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span class="text-3xl drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)]">📅</span>
              <div class="space-y-1">
                <h3 class="font-heading text-lg text-emerald-100">Kalender</h3>
                <p class="text-sm text-slate-200/75">Behalte deine Termine und Deadlines immer im Blick.</p>
              </div>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/schedule"
              class="flex items-start gap-3 rounded-2xl border border-slate-400/15 bg-slate-900/60 p-4 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,185,129,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span class="text-3xl drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)]">🗓️</span>
              <div class="space-y-1">
                <h3 class="font-heading text-lg text-emerald-100">Plan</h3>
                <p class="text-sm text-slate-200/75">Gestalte deinen Stundenplan so flexibel wie du bist.</p>
              </div>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/grades"
              class="flex items-start gap-3 rounded-2xl border border-slate-400/15 bg-slate-900/60 p-4 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,185,129,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span class="text-3xl drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)]">📈</span>
              <div class="space-y-1">
                <h3 class="font-heading text-lg text-emerald-100">Noten</h3>
                <p class="text-sm text-slate-200/75">Behalt den Überblick über deinen Fortschritt und feiere Erfolge.</p>
              </div>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/cards"
              class="flex items-start gap-3 rounded-2xl border border-slate-400/15 bg-slate-900/60 p-4 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,185,129,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span class="text-3xl drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)]">🧠</span>
              <div class="space-y-1">
                <h3 class="font-heading text-lg text-emerald-100">Karten</h3>
                <p class="text-sm text-slate-200/75">Lerne spielerisch mit Karten, die sich an deinen Stil anpassen.</p>
              </div>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/shopping"
              class="flex items-start gap-3 rounded-2xl border border-slate-400/15 bg-slate-900/60 p-4 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(16,185,129,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <span class="text-3xl drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)]">🛒</span>
              <div class="space-y-1">
                <h3 class="font-heading text-lg text-emerald-100">Einkaufen</h3>
                <p class="text-sm text-slate-200/75">Organisiere deine Einkaufslisten, damit nichts mehr fehlt.</p>
              </div>
            </RouterLink>
          </li>
        </ol>
      </section>

      <footer class="text-sm text-emerald-200/80 drop-shadow-[0_1px_0_rgba(15,23,42,0.8)]">
        Viel Spaß beim Nutzen von TriCat!
      </footer>
    </main>
  </div>
</template>
