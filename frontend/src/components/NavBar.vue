<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur border-t border-slate-700 text-slate-300"
  >
    <ul class="grid grid-cols-5 text-center text-xs">
      <li>
        <RouterLink to="/" class="block p-3 hover:text-white" active-class="text-white">
          <HomeIcon class="w-6 h-6 mx-auto" />
          <span>Home</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/calendar" class="block p-3 hover:text-white" active-class="text-white">
          <CalendarIcon class="w-6 h-6 mx-auto" />
          <span>Kalender</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/schedule" class="block p-3 hover:text-white" active-class="text-white">
          <ClockIcon class="w-6 h-6 mx-auto" />
          <span>Plan</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/grades" class="block p-3 hover:text-white" active-class="text-white">
          <ClipboardListIcon class="w-6 h-6 mx-auto" />
          <span>Noten</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/cards" class="block p-3 hover:text-white" active-class="text-white">
          <BookOpenIcon class="w-6 h-6 mx-auto" />
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
