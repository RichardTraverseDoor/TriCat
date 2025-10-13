<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-950/60 p-6 shadow-xl shadow-emerald-900/30"
  >
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_rgba(15,23,42,0))]"></div>

    <header class="flex flex-wrap items-center justify-between gap-6">
      <div class="flex flex-1 items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15">
          <Cat class="h-8 w-8 text-emerald-200" aria-hidden="true" />
        </div>
        <div class="flex-1">
          <input
            v-model="editableName"
            type="text"
            class="w-full rounded-2xl border border-transparent bg-slate-900/70 px-4 py-2 font-heading text-2xl text-emerald-100 transition focus:border-emerald-400/70 focus:outline-none focus:ring-0"
            @blur="onNameBlur"
          />
          <p class="mt-1 text-sm text-emerald-100/70">{{ list.mood }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-3 rounded-2xl bg-slate-900/70 px-4 py-3 text-xs text-emerald-100/70">
          <Fish class="h-4 w-4" aria-hidden="true" />
          <div class="leading-tight">
            <p class="font-semibold text-emerald-100">{{ list.dishes.length }} Gericht{{ list.dishes.length === 1 ? '' : 'e' }}</p>
            <p>{{ remainingIngredients }} Zutaten miauen noch</p>
          </div>
        </div>
        <button
          type="button"
          class="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          @click="onRemoveList"
        >
          Liste löschen
        </button>
      </div>
    </header>

    <form class="mt-8 flex flex-wrap gap-3" @submit.prevent="onCreateDish">
      <div class="flex-1 min-w-[12rem]">
        <label class="sr-only" for="new-dish">Neues Gericht</label>
        <input
          id="new-dish"
          v-model="dishName"
          type="text"
          placeholder="Gericht schnurren, z. B. Samtpfoten-Curry"
          class="w-full rounded-2xl border border-emerald-400/30 bg-slate-900/70 px-4 py-3 text-sm text-emerald-100 placeholder:text-emerald-100/40 focus:border-emerald-300 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="inline-flex items-center gap-2 rounded-2xl bg-emerald-400/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        <PlusCircle class="h-4 w-4" />
        Gericht hinzufügen
      </button>
    </form>

    <div v-if="list.dishes.length > 0" class="mt-8 space-y-5">
      <article
        v-for="dish in list.dishes"
        :key="dish.id"
        class="rounded-3xl border border-emerald-400/20 bg-slate-900/70 p-5 shadow-inner shadow-emerald-900/30"
      >
        <header class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 class="font-heading text-xl text-emerald-100">{{ dish.name }}</h3>
            <p class="text-xs uppercase tracking-[0.25em] text-emerald-200/60">Lieblings-Leckerlis</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100/80">
              {{ openIngredientsPerDish(dish) }} / {{ dish.ingredients.length }} offen
            </span>
            <button
              type="button"
              class="rounded-full p-2 text-emerald-100/60 transition hover:bg-slate-900/80 hover:text-emerald-200"
              @click="emit('remove-dish', { listId: list.id, dishId: dish.id })"
            >
              <Trash2 class="h-4 w-4" aria-hidden="true" />
              <span class="sr-only">Gericht entfernen</span>
            </button>
          </div>
        </header>

        <ul class="mt-4 space-y-3">
          <li v-for="ingredient in dish.ingredients" :key="ingredient.id">
            <label
              class="flex items-center gap-4 rounded-2xl border border-transparent bg-slate-950/70 px-4 py-3 text-sm text-emerald-100 transition hover:border-emerald-400/40"
              :class="{ 'opacity-60 line-through decoration-emerald-300/70': ingredient.purchased }"
            >
              <input
                :checked="ingredient.purchased"
                type="checkbox"
                class="h-4 w-4 rounded border-emerald-400/40 bg-slate-900 text-emerald-300 focus:ring-emerald-300"
                @change="emit('toggle-ingredient', { listId: list.id, dishId: dish.id, ingredientId: ingredient.id })"
              />
              <span class="flex-1">{{ ingredient.name }}</span>
              <button
                type="button"
                class="rounded-full p-2 text-emerald-100/60 transition hover:bg-slate-900/80 hover:text-emerald-200"
                @click="emit('remove-ingredient', { listId: list.id, dishId: dish.id, ingredientId: ingredient.id })"
              >
                <Trash2 class="h-4 w-4" aria-hidden="true" />
                <span class="sr-only">Zutat entfernen</span>
              </button>
            </label>
          </li>
        </ul>

        <form class="mt-4 flex flex-wrap gap-3" @submit.prevent="onAddIngredient(dish.id)">
          <div class="flex-1 min-w-[12rem]">
            <label class="sr-only" :for="`new-ingredient-${dish.id}`">Neue Zutat</label>
            <input
              :id="`new-ingredient-${dish.id}`"
              v-model="ingredientDrafts[dish.id]"
              type="text"
              placeholder="Zutat ergänzen, z. B. Katzenminze"
              class="w-full rounded-2xl border border-emerald-400/20 bg-slate-950/70 px-4 py-3 text-sm text-emerald-100 placeholder:text-emerald-100/40 focus:border-emerald-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            class="inline-flex items-center gap-2 rounded-2xl bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <Feather class="h-4 w-4" />
            Zutat hinzufügen
          </button>
        </form>
      </article>
    </div>
    <div
      v-else
      class="mt-10 rounded-3xl border border-dashed border-emerald-400/30 bg-slate-900/50 p-10 text-center text-sm text-emerald-100/70"
    >
      Noch keine Gerichte im Revier. Lass dir etwas Schnurriges einfallen und füge es oben hinzu!
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { Cat, Feather, Fish, PlusCircle, Trash2 } from 'lucide-vue-next';

import type { Dish, ShoppingList } from '@/types/shopping';

type IngredientDraftMap = Record<string, string>;

const props = defineProps<{
  list: ShoppingList;
}>();

const emit = defineEmits<{
  (e: 'rename', payload: { id: string; name: string }): void;
  (e: 'add-dish', payload: { listId: string; name: string }): void;
  (e: 'add-ingredient', payload: { listId: string; dishId: string; name: string }): void;
  (e: 'toggle-ingredient', payload: { listId: string; dishId: string; ingredientId: string }): void;
  (e: 'remove-ingredient', payload: { listId: string; dishId: string; ingredientId: string }): void;
  (e: 'remove-dish', payload: { listId: string; dishId: string }): void;
  (e: 'remove-list', id: string): void;
}>();

const dishName = ref('');
const editableName = ref(props.list.name);
const ingredientDrafts = reactive<IngredientDraftMap>({});

watch(
  () => props.list.name,
  (value) => {
    editableName.value = value;
  },
  { immediate: true }
);

watch(
  () => props.list.dishes,
  (dishes) => {
    const dishIds = new Set(dishes.map((dish) => dish.id));
    for (const dish of dishes) {
      if (!(dish.id in ingredientDrafts)) {
        ingredientDrafts[dish.id] = '';
      }
    }
    for (const id of Object.keys(ingredientDrafts)) {
      if (!dishIds.has(id)) {
        delete ingredientDrafts[id];
      }
    }
  },
  { immediate: true, deep: true }
);

const remainingIngredients = computed(() =>
  props.list.dishes.reduce(
    (sum, dish) => sum + dish.ingredients.filter((ingredient) => !ingredient.purchased).length,
    0
  )
);

const openIngredientsPerDish = (dish: Dish) =>
  dish.ingredients.filter((ingredient) => !ingredient.purchased).length;

const onNameBlur = () => {
  const trimmed = editableName.value.trim();
  if (!trimmed) {
    editableName.value = props.list.name;
    return;
  }

  if (trimmed !== props.list.name) {
    emit('rename', { id: props.list.id, name: trimmed });
  }
};

const onCreateDish = () => {
  const name = dishName.value.trim();
  if (!name) return;
  emit('add-dish', { listId: props.list.id, name });
  dishName.value = '';
};

const onAddIngredient = (dishId: string) => {
  const name = ingredientDrafts[dishId]?.trim();
  if (!name) return;
  emit('add-ingredient', { listId: props.list.id, dishId, name });
  ingredientDrafts[dishId] = '';
};

const onRemoveList = () => {
  emit('remove-list', props.list.id);
};
</script>
