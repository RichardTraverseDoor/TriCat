<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-500/30 bg-slate-900/85 backdrop-blur-md text-slate-200 md:static md:mt-auto md:border-none md:bg-transparent md:px-12 md:py-8 md:backdrop-blur-0 md:text-slate-100 md:shadow-none"
  >
    <ul class="grid grid-cols-5 text-center text-[0.7rem] font-medium uppercase tracking-wide md:flex md:items-center md:justify-between md:text-sm md:normal-case md:tracking-normal md:gap-8">
      <li>
        <RouterLink
          to="/"
          class="flex flex-col items-center gap-1 p-3 transition-colors hover:text-white md:flex-row md:gap-2 md:p-0"
          active-class="text-emerald-300"
        >
          <HomeIcon class="h-6 w-6 md:h-5 md:w-5" />
          <span>Home</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/calendar"
          class="flex flex-col items-center gap-1 p-3 transition-colors hover:text-white md:flex-row md:gap-2 md:p-0"
          active-class="text-emerald-300"
        >
          <CalendarIcon class="h-6 w-6 md:h-5 md:w-5" />
          <span>Kalender</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/schedule"
          class="flex flex-col items-center gap-1 p-3 transition-colors hover:text-white md:flex-row md:gap-2 md:p-0"
          active-class="text-emerald-300"
        >
          <ClockIcon class="h-6 w-6 md:h-5 md:w-5" />
          <span>Plan</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/grades"
          class="flex flex-col items-center gap-1 p-3 transition-colors hover:text-white md:flex-row md:gap-2 md:p-0"
          active-class="text-emerald-300"
        >
          <ClipboardListIcon class="h-6 w-6 md:h-5 md:w-5" />
          <span>Noten</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/cards"
          class="flex flex-col items-center gap-1 p-3 transition-colors hover:text-white md:flex-row md:gap-2 md:p-0"
          active-class="text-emerald-300"
        >
          <BookOpenIcon class="h-6 w-6 md:h-5 md:w-5" />
          <span>Karten</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  HomeIcon,
  CalendarIcon,
  ClipboardListIcon,
  BookOpenIcon,
  ClockIcon
} from 'lucide-vue-next'
</script>
