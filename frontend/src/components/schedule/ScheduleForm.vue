<template>
  <form
    class="relative flex flex-col gap-6 rounded-3xl border border-emerald-300/20 bg-slate-900/70 p-6 shadow-[0_25px_45px_rgba(15,23,42,0.55)] backdrop-blur-xl"
    @submit.prevent="handleSubmit"
  >
    <header class="flex items-start justify-between gap-4 text-emerald-100">
      <div>
        <p class="text-sm uppercase tracking-[0.25em] text-emerald-200/70">Neues Fach</p>
        <h2 class="text-xl font-semibold">Kreiere deinen miauzigen Eintrag</h2>
      </div>
      <span class="text-3xl">📝</span>
    </header>

    <div class="grid gap-4">
      <label class="flex flex-col gap-2 text-sm text-emerald-100/90">
        <span class="font-semibold text-emerald-100">Titel des Fachs</span>
        <input
          v-model="form.title"
          type="text"
          required
          placeholder="z. B. Algorithmen & Katzenlogik"
          class="w-full rounded-2xl border border-emerald-300/30 bg-slate-900/60 px-4 py-3 text-base text-emerald-50 placeholder:text-emerald-200/40 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
        />
      </label>

      <div class="grid gap-3">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200/70">Art des Termins</p>
        <div class="grid gap-3 sm:grid-cols-3">
          <button
            v-for="option in typeOptions"
            :key="option.value"
            type="button"
            class="group relative flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition"
            :class="[
              option.meta.cardClass,
              form.type === option.value
                ? 'border-emerald-200/80 shadow-lg shadow-emerald-900/40'
                : 'border-transparent bg-emerald-400/5 hover:border-emerald-300/40 hover:bg-emerald-400/10'
            ]"
            @click="selectType(option.value)"
          >
            <span class="flex items-center gap-2 text-base font-semibold text-emerald-50">
              <span class="text-lg">{{ option.meta.icon }}</span>
              {{ option.meta.label }}
            </span>
            <span class="text-xs text-emerald-100/70">{{ option.meta.description }}</span>
            <span
              class="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-100/30 bg-slate-900/60 text-xs font-semibold text-emerald-100/80"
              v-if="form.type === option.value"
            >
              ✓
            </span>
          </button>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm text-emerald-100/90">
          <span class="font-semibold text-emerald-100">Wochentag</span>
          <select
            v-model="form.day"
            class="w-full rounded-2xl border border-emerald-300/30 bg-slate-900/60 px-4 py-3 text-base text-emerald-50 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
          >
            <option v-for="day in dayOrder" :key="day" :value="day">{{ scheduleDayLabels[day] }}</option>
          </select>
        </label>

        <label class="flex flex-col gap-2 text-sm text-emerald-100/90">
          <span class="font-semibold text-emerald-100">Raum</span>
          <input
            v-model="form.room"
            type="text"
            placeholder="z. B. 3.14 Schnurrlab"
            class="w-full rounded-2xl border border-emerald-300/30 bg-slate-900/60 px-4 py-3 text-base text-emerald-50 placeholder:text-emerald-200/40 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
          />
        </label>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm text-emerald-100/90">
          <span class="font-semibold text-emerald-100">Startzeit</span>
          <select
            v-model="form.startTime"
            class="w-full rounded-2xl border border-emerald-300/30 bg-slate-900/60 px-4 py-3 text-base text-emerald-50 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
          >
            <option v-for="slot in startTimeOptions" :key="slot" :value="slot">{{ slot }}</option>
          </select>
        </label>

        <label class="flex flex-col gap-2 text-sm text-emerald-100/90">
          <span class="font-semibold text-emerald-100">Endzeit</span>
          <select
            v-model="form.endTime"
            class="w-full rounded-2xl border border-emerald-300/30 bg-slate-900/60 px-4 py-3 text-base text-emerald-50 focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
          >
            <option v-for="slot in endTimeOptions" :key="slot" :value="slot">{{ slot }}</option>
          </select>
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <button
        type="submit"
        class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400/80 to-teal-400/80 px-5 py-3 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-900/30 transition hover:from-emerald-300 hover:to-teal-300"
      >
        <span>🐈‍⬛</span>
        Termin speichern
      </button>

      <p v-if="feedbackMessage" :class="feedbackClass" class="rounded-2xl px-4 py-2 text-sm">
        {{ feedbackMessage }}
      </p>
    </div>

    <span class="pointer-events-none absolute -right-4 -top-6 text-5xl text-emerald-200/25">✨</span>
    <span class="pointer-events-none absolute -left-8 bottom-4 text-6xl text-emerald-200/15">🐾</span>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import {
  scheduleDayLabels,
  scheduleEntryTypeMeta,
  type CreateScheduleEntryPayload,
  type ScheduleDay,
  type ScheduleEntryType,
  type ScheduleTimeSlot,
} from '@/types/schedule';

const props = defineProps<{
  dayOrder: ScheduleDay[];
  timeSlots: ScheduleTimeSlot[];
}>();

const emit = defineEmits<{
  submit: [payload: CreateScheduleEntryPayload];
}>();

const typeOptions = (Object.entries(scheduleEntryTypeMeta) as [ScheduleEntryType, typeof scheduleEntryTypeMeta[keyof typeof scheduleEntryTypeMeta]][]).map(
  ([value, meta]) => ({
    value,
    meta,
  }),
);

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map((value) => Number.parseInt(value, 10));
  return hours * 60 + minutes;
};

const startTimeOptions = computed(() => props.timeSlots.slice(0, -1));

const computeNextSlot = (start: string) =>
  props.timeSlots.find((slot) => toMinutes(slot) > toMinutes(start)) ?? start;

const createInitialForm = () => {
  const start = startTimeOptions.value[0] ?? props.timeSlots[0] ?? '08:00';
  const end = computeNextSlot(start);

  return {
    title: '',
    type: typeOptions[0]?.value ?? 'lecture',
    day: props.dayOrder[0] ?? 'monday',
    startTime: start,
    endTime: end,
    room: '',
  };
};

const form = reactive(createInitialForm());

const feedbackMessage = ref('');
const feedbackType = ref<'success' | 'error' | null>(null);

const endTimeOptions = computed(() =>
  props.timeSlots.filter((slot) => toMinutes(slot) > toMinutes(form.startTime)),
);

watch(
  () => form.startTime,
  () => {
    if (!endTimeOptions.value.includes(form.endTime)) {
      form.endTime = endTimeOptions.value[0] ?? form.startTime;
    }
  },
);

watch(
  () => [form.title, form.type, form.day, form.startTime, form.endTime, form.room],
  () => {
    if (feedbackType.value === 'error') {
      feedbackType.value = null;
      feedbackMessage.value = '';
    }
  },
  { deep: false },
);

const feedbackClass = computed(() => {
  if (!feedbackType.value) {
    return '';
  }
  return feedbackType.value === 'success'
    ? 'border border-emerald-300/40 bg-emerald-400/10 text-emerald-100'
    : 'border border-rose-300/40 bg-rose-400/10 text-rose-100';
});

const selectType = (type: ScheduleEntryType) => {
  form.type = type;
};

const handleSubmit = () => {
  if (!form.title.trim()) {
    feedbackType.value = 'error';
    feedbackMessage.value = 'Ups! Gib deinem Fach bitte noch einen Namen.';
    return;
  }

  if (!endTimeOptions.value.length) {
    feedbackType.value = 'error';
    feedbackMessage.value = 'Die Endzeit miaut nicht richtig. Bitte wähle eine spätere Zeit.';
    return;
  }

  const payload: CreateScheduleEntryPayload = {
    title: form.title.trim(),
    type: form.type,
    day: form.day,
    startTime: form.startTime,
    endTime: form.endTime,
    room: form.room.trim(),
  };

  emit('submit', payload);

  feedbackType.value = 'success';
  feedbackMessage.value = 'Schnurr! Dein Termin glitzert nun im Stundenplan.';

  form.title = '';
  form.room = '';
};
</script>
