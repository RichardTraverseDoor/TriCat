<template>
  <div class="app-shell text-emerald-50">
    <main class="app-main">
      <RouterView />
    </main>

    <NavBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.86), rgba(17, 24, 39, 0.78));
  backdrop-filter: blur(12px) saturate(120%);
  border-left: 1px solid rgba(148, 163, 184, 0.14);
  border-right: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 0 40px rgba(15, 23, 42, 0.55);
  margin: 0 auto;
  max-width: 960px;
  width: min(100%, 960px);
}

.app-shell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: 460px;
  height: 12px;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.5), rgba(74, 222, 128, 0));
  filter: blur(12px);
  pointer-events: none;
}

.app-main {
  flex: 1;
  padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 3rem) clamp(5.5rem, 6vw, 6.5rem);
  position: relative;
  z-index: 0;
}

@media (max-width: 768px) {
  .app-shell {
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
    max-width: 100%;
  }

  .app-main {
    padding: clamp(1.25rem, 5vw, 2.5rem) clamp(1rem, 6vw, 2rem) clamp(4.5rem, 8vw, 5.5rem);
  }
}

@media (min-width: 769px) {
  .app-shell {
    border-radius: 32px;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    position: relative;
  }
}
</style>
