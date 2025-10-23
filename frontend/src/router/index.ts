import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/calendar', name: 'calendar', component: () => import('@/views/CalendarView.vue') },
  { path: '/grades', name: 'grades', component: () => import('@/views/GradesView.vue') },
  { path: '/schedule', name: 'schedule', component: () => import('@/views/ScheduleView.vue') },
  { path: '/shopping', name: 'shopping', component: () => import('@/views/ShoppingView.vue') },
  { path: '/cards', name: 'cards', component: () => import('@/views/CardsView.vue') },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
