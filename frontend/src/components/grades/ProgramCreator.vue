<template>
  <div
    class="rounded-3xl border border-emerald-300/20 bg-slate-900/80 p-6 text-emerald-50 shadow-inner shadow-emerald-900/30"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-xl font-semibold text-emerald-100">Neuer Studiengang</h3>
        <p class="mt-1 text-sm text-emerald-200/80">
          Gib dem flauschigen Pfad einen Namen. Du kannst später jederzeit Semester hinzufügen.
        </p>
      </div>
      <button
        type="button"
        class="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100 transition hover:bg-emerald-500/20"
        @click="emit('cancel')"
      >
        abbrechen
      </button>
    </div>

    <form class="mt-6 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <label class="flex flex-col gap-2 text-sm text-emerald-100">
        <span class="font-medium">Studiengangsname</span>
        <input
          v-model="localName"
          type="text"
          required
          placeholder="z.B. Meowtastische Medieninformatik B.Sc."
          class="rounded-2xl border border-emerald-400/30 bg-slate-800/80 px-4 py-2 text-base text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
      </label>
      <button
        type="submit"
        class="flex items-center justify-center gap-2 rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-400/30"
      >
        <span class="text-lg">✨</span>
        <span>Studiengang speichern</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  submit: [];
  cancel: [];
}>();

const localName = ref(props.modelValue);

watchEffect(() => {
  localName.value = props.modelValue;
});

const handleSubmit = () => {
  emit('update:modelValue', localName.value.trim());
  emit('submit');
};
</script>
