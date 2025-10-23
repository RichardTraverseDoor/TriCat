<template>
  <aside class="space-y-5">
    <div
      class="overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-900/60 p-6 shadow-lg shadow-emerald-900/40"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-emerald-200/70">Miau-Übersicht</p>
          <h2 class="mt-2 font-heading text-2xl text-emerald-100">Deine Einkaufs-Reviere</h2>
          <p class="mt-2 text-sm text-emerald-100/70">
            Noch
            <span class="font-semibold text-emerald-200">{{ openIngredients }}</span>
            schnurrende Zutaten warten darauf, eingesammelt zu werden.
          </p>
        </div>
        <PawPrint class="h-12 w-12 text-emerald-300" aria-hidden="true" />
      </div>
      <button
        type="button"
        class="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        @click="$emit('create')"
      >
        <Plus class="h-4 w-4" />
        Neue Liste schnurren
      </button>
    </div>

    <div
      v-if="lists.length === 0"
      class="rounded-3xl border border-dashed border-emerald-400/30 bg-slate-900/40 p-8 text-center text-sm text-emerald-100/70"
    >
      Noch keine Liste geschnurrt! Erstelle eine neue Fellnasen-Liste und fülle sie mit köstlichen Ideen.
    </div>

    <ul v-else class="space-y-3">
      <li v-for="list in lists" :key="list.id">
        <article
          class="group rounded-3xl border border-transparent bg-slate-900/40 p-5 transition hover:border-emerald-400/40 hover:bg-slate-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          :class="{
            'border-emerald-400/60 bg-slate-900/70 shadow-[0_0_25px_rgba(52,211,153,0.25)]': list.id === activeListId
          }"
          role="button"
          tabindex="0"
          @click="$emit('select', list.id)"
          @keydown.enter.stop.prevent="$emit('select', list.id)"
          @keydown.space.stop.prevent="$emit('select', list.id)"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="font-heading text-xl text-emerald-100">{{ list.name }}</h3>
              <p class="text-sm text-emerald-100/70">{{ list.mood }}</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex flex-col items-end text-right text-xs text-emerald-100/60">
                <span class="rounded-full bg-emerald-400/10 px-3 py-1 font-medium text-emerald-100/90">
                  {{ list.dishes.length }} Gericht{{ list.dishes.length === 1 ? '' : 'e' }}
                </span>
                <span class="mt-2 flex items-center gap-1 text-[11px]">
                  <Sparkles class="h-3.5 w-3.5" />
                  {{ getOpenIngredients(list) }} frei flatternde Zutaten
                </span>
              </div>
              <button
                type="button"
                class="rounded-full p-2 text-emerald-100/40 transition hover:bg-slate-900/80 hover:text-emerald-200"
                @click.stop="$emit('remove', list.id)"
                aria-label="Liste löschen"
              >
                <Trash2 class="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PawPrint, Plus, Sparkles, Trash2 } from 'lucide-vue-next';

import type { ShoppingList } from '@/types/shopping';

const props = defineProps<{
  lists: ShoppingList[];
  activeListId: number | null;
}>();

defineEmits<{
  (e: 'select', id: number): void;
  (e: 'create'): void;
  (e: 'remove', id: number): void;
}>();

const getOpenIngredients = (list: ShoppingList) =>
  list.dishes.reduce((sum, dish) => sum + dish.ingredients.filter((ingredient) => !ingredient.purchased).length, 0);

const openIngredients = computed(() => props.lists.reduce((sum, list) => sum + getOpenIngredients(list), 0));
</script>
