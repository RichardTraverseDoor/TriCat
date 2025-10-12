<template>
  <div class="min-h-screen flex flex-col bg-slate-900 text-slate-100">
    <main class="flex-1 pb-20">
      <!-- RouterView = Platzhalter für alle Seiten -->
      <RouterView />
    </main>

    <!-- Navigationsleiste unten -->
    <NavBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>
