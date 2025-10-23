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
          <!-- 💡 Dein Installations-Modal -->
      <div
        v-if="showInstallPrompt"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      >
        <div class="bg-slate-800 rounded-2xl p-6 text-center shadow-xl border border-emerald-500/30 w-80">
          <h2 class="text-xl font-semibold mb-3 text-emerald-300">TriCat installieren 🐾</h2>
          <p class="text-sm text-emerald-100/80 mb-6">
            Installiere TriCat als App auf deinem Gerät, um sie schneller zu starten.
          </p>
          <div class="flex justify-center gap-3">
            <button
              @click="installApp"
              class="rounded-xl bg-emerald-500/80 hover:bg-emerald-400 px-4 py-2 font-semibold text-slate-900"
            >
              Jetzt installieren
            </button>
            <button
              @click="showInstallPrompt = false"
              class="rounded-xl bg-slate-700 hover:bg-slate-600 px-4 py-2 font-semibold text-emerald-200"
            >
              Später
            </button>
          </div>
        </div>
      </div>
  </div>
  <NavBar />
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import {ref, onMounted} from 'vue';

const deferredPrompt = ref<Event | null>(null);
const showInstallPrompt = ref(false);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault(); // verhindert den automatischen Banner
    deferredPrompt.value = e;
    showInstallPrompt.value = true; // zeigt dein eigenes Modal
  });

  window.addEventListener('appinstalled', () => {
    showInstallPrompt.value = false;
    deferredPrompt.value = null;
    console.log('PWA wurde installiert!');
  });
});

const installApp = async () => {
  if (!deferredPrompt.value) return;
  const promptEvent = deferredPrompt.value as any;
  promptEvent.prompt();
  const { outcome } = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  deferredPrompt.value = null;
  showInstallPrompt.value = false;
};

</script>
