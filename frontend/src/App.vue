<template>
  <div
    class="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col bg-gradient-to-b from-slate-900/90 to-slate-900/75 text-emerald-50 backdrop-blur-xl md:my-10 md:rounded-[32px] md:border-x md:border-slate-400/20 md:shadow-[0_0_40px_rgba(15,23,42,0.55)]"
  >
    <div
      class="pointer-events-none absolute inset-x-1/2 top-0 hidden h-3 w-3/4 -translate-x-1/2 bg-[radial-gradient(circle,rgba(74,222,128,0.5),rgba(74,222,128,0))] blur-xl md:block"
      aria-hidden="true"
    ></div>

      <main class="relative flex-1 px-4 pb-32 pt-10 sm:px-8 sm:pt-12 md:px-12 lg:px-16 lg:pb-16">
        <RouterView />
      </main>
  </div>
  <NavBar />
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>
