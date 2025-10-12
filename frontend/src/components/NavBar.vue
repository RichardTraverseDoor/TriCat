<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-500/30 bg-slate-900/85 pb-[env(safe-area-inset-bottom)] text-slate-200 backdrop-blur-md lg:static lg:mt-auto lg:border-none lg:bg-transparent lg:px-12 lg:py-8 lg:pb-0 lg:backdrop-blur-0 lg:text-slate-100 lg:shadow-none"
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
