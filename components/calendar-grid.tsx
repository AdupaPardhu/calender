"use client"
import { CalendarDay } from "@/components/calendar-day"
import type { Event } from "@/types/event"
import { DayView } from "./day-view"
import { WeekView } from "./week-view"

interface CalendarGridProps {
  currentDate: Date
  events: Event[]
  onDateClick: (date: Date) => void
  viewMode?: "month" | "week" | "day"
}

export function CalendarGrid({ currentDate, events, onDateClick, viewMode = "month" }: CalendarGridProps) {
  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  if (viewMode === "week") {
    return <WeekView currentDate={currentDate} events={events} onDateClick={onDateClick} />
  }

  if (viewMode === "day") {
    return <DayView currentDate={currentDate} events={events} onDateClick={onDateClick} />
  }

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Get previous month's last days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const days = []

  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const date = new Date(currentYear, currentMonth - 1, day)
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })

    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: false,
      events: dayEvents,
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const isToday = date.toDateString() === today.toDateString()
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })

    days.push({
      date,
      day,
      isCurrentMonth: true,
      isToday,
      events: dayEvents,
    })
  }

  // Next month's leading days
  const remainingDays = 42 - days.length // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day)
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })

    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: false,
      events: dayEvents,
    })
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-black/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-black/20">
        {weekdays.map((day) => (
          <div key={day} className="p-4 text-center text-white/80 font-medium border-r border-white/10 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7">
        {days.map((dayData, index) => (
          <CalendarDay key={index} {...dayData} onClick={() => onDateClick(dayData.date)} />
        ))}
      </div>
    </div>
  )
}
