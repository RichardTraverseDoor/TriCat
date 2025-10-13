<template>
  <transition name="fade">
    <div
      v-if="isAddingEvent"
      class="fixed inset-0 z-20 grid place-items-center bg-slate-950/70 backdrop-blur"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative flex w-full max-w-md flex-col gap-4 overflow-hidden rounded-3xl border border-emerald-300/30 bg-slate-900/90 p-6 text-emerald-50 shadow-[0_25px_45px_rgba(16,185,129,0.3)] sm:p-8 max-h-[85vh]"
      >
        <button
          type="button"
          class="absolute right-4 top-4 rounded-full border border-emerald-300/30 bg-slate-900/80 p-2 text-sm text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-400/20"
          aria-label="Schließen"
          @click="$emit('close')"
        >
          ✖️
        </button>

        <h3 class="font-heading text-2xl text-emerald-200">Schnurriger Terminplaner</h3>
        <p class="mt-1 text-sm text-emerald-100/70">{{ selectedDateLabel }}</p>

        <section class="mt-5 flex max-h-[40vh] flex-col gap-3 overflow-y-auto pr-1">
          <div
            v-if="eventsForSelectedDate.length === 0"
            class="rounded-2xl border border-dashed border-emerald-300/30 bg-slate-900/70 px-4 py-3 text-sm text-emerald-100/80"
          >
            Noch keine Pfotenspuren an diesem Tag – füge deinen ersten Termin hinzu!
          </div>

          <ul v-else class="flex flex-col gap-3">
            <li
              v-for="event in eventsForSelectedDate"
              :key="event.id"
              class="flex items-center justify-between gap-3 rounded-2xl border border-emerald-300/30 bg-slate-900/70 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <span class="text-xl">🐾</span>
                <span class="text-sm font-semibold text-emerald-100">{{ event.title }}</span>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-transparent px-3 py-1 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-400/10"
                @click="$emit('delete', event.id)"
              >
                ❌ Löschen
              </button>
            </li>
          </ul>
        </section>

        <form class="mt-2 space-y-4" @submit.prevent="$emit('add', newEventTitle)">
          <label class="block text-sm font-semibold text-emerald-100">
            Titel deines Termins
            <input
              v-model="newEventTitle"
              type="text"
              required
              class="mt-2 w-full rounded-2xl border border-emerald-300/30 bg-slate-900/80 px-4 py-2 text-base text-emerald-50 shadow-[0_12px_24px_rgba(16,185,129,0.18)] focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
              placeholder="z. B. Mathe-Session mit Mieze"
            />
          </label>

          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              class="rounded-full border border-emerald-300/30 bg-transparent px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-400/10"
              @click="$emit('close')"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-400/20 px-5 py-2 text-sm font-semibold text-emerald-50 shadow-[0_18px_32px_rgba(16,185,129,0.24)] transition hover:bg-emerald-400/30"
            >
              ✅ Termin speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  isAddingEvent: boolean
  selectedDateLabel: string
  eventsForSelectedDate: { id: number; title: string }[]
}>()

const newEventTitle = defineModel<string>('newEventTitle', { default: '' })

defineEmits(['close', 'add', 'delete'])
</script>
