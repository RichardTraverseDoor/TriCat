<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24"
  >
    <span
      class="pointer-events-none absolute left-[10vw] top-14 text-5xl text-emerald-200/70 opacity-30 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      aria-hidden="true"
    >🐾</span>
    <span
      class="pointer-events-none absolute right-[12vw] top-24 text-5xl text-emerald-200/60 opacity-25 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      style="animation-delay: -4s"
      aria-hidden="true"
    >🐱</span>
    <span
      class="pointer-events-none absolute bottom-16 left-[18vw] text-5xl text-emerald-200/60 opacity-25 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      style="animation-delay: -8s"
      aria-hidden="true"
    >🧶</span>

    <main class="relative z-10 flex w-full max-w-5xl flex-col gap-12 text-emerald-50">
      <CalendarHero />

      <section class="grid gap-10">
        <CalendarUpcomingSection :events="upcomingEvents" :placeholders="placeholderCards" />

        <div
          class="rounded-3xl border border-slate-400/20 bg-slate-900/70 p-6 shadow-[0_25px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8"
        >
          <CalendarHeader
            :monthLabel="monthLabel"
            @prev="goToPreviousMonth"
            @today="goToToday"
            @next="goToNextMonth"
          />
          <CalendarGrid
            :days="calendarDays"
            :eventsByDate="eventsByDate"
            :selectedDateIso="selectedDateIso"
            :weekdays="weekdays"
            @select="handleDayClick"
          />

          <footer class="mt-6 flex flex-wrap items-center gap-2 text-xs text-emerald-100/70 sm:text-sm">
            <span class="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">🐾</span>
            <p>Markiert Tage mit gebuchten Terminen. Sammle so viele Pfotenabdrücke wie möglich!</p>
          </footer>
        </div>
      </section>
    </main>

    <CalendarModal
      :isAddingEvent="isAddingEvent"
      :selectedDateLabel="selectedDateLabel"
      :eventsForSelectedDate="eventsForSelectedDate"
      v-model:newEventTitle="newEventTitle"
      @close="closeForm"
      @add="addEvent"
      @delete="deleteEvent"
    />
  </div>
</template>

<script setup lang="ts">
import CalendarHeader from '@/components/calendar/CalendarHeader.vue'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import CalendarModal from '@/components/calendar/CalendarModal.vue'
import CalendarHero from '@/views/calendar/components/CalendarHero.vue'
import CalendarUpcomingSection from '@/views/calendar/components/CalendarUpcomingSection.vue'
import { useCalendarView } from '@/views/calendar/useCalendarView'

const {
  monthLabel,
  calendarDays,
  eventsByDate,
  selectedDateIso,
  weekdays,
  upcomingEvents,
  placeholderCards,
  isAddingEvent,
  selectedDateLabel,
  eventsForSelectedDate,
  newEventTitle,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  handleDayClick,
  closeForm,
  addEvent,
  deleteEvent
} = useCalendarView();
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
