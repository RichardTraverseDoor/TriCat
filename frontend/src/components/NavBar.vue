<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-500/30 bg-slate-900/85 pb-[env(safe-area-inset-bottom)] text-slate-200 backdrop-blur-md lg:static lg:mt-auto lg:border-none lg:bg-transparent lg:px-12 lg:py-8 lg:pb-0 lg:backdrop-blur-0 lg:text-slate-100 lg:shadow-none"
  >
    <ul class="grid grid-cols-6 text-center text-[0.7rem] font-medium uppercase tracking-wide md:flex md:items-center md:justify-between md:text-sm md:normal-case md:tracking-normal md:gap-8">
      <li v-for="link in links" :key="link.to">
        <RouterLink
          :to="link.to"
          class="flex flex-col items-center gap-1 p-3 transition-colors hover:text-white md:flex-row md:gap-2 md:p-0"
          :class="{ 'text-emerald-300': isActive(link.to) }"
        >
          <component :is="link.icon" class="h-6 w-6 md:h-5 md:w-5" />
          <span>{{ link.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { HomeIcon, CalendarIcon, ClipboardListIcon, BookOpenIcon, ClockIcon, ShoppingCartIcon } from 'lucide-vue-next'

const route = useRoute()

const links = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/calendar', label: 'Kalender', icon: CalendarIcon },
  { to: '/schedule', label: 'Plan', icon: ClockIcon },
  { to: '/grades', label: 'Noten', icon: ClipboardListIcon },
  { to: '/shopping', label: 'Einkaufen', icon: ShoppingCartIcon },
  { to: '/cards', label: 'Karten', icon: BookOpenIcon },
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>
