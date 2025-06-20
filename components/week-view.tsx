"use client"

import { CalendarDay } from "@/components/calendar-day"
import type { Event } from "@/types/event"

interface WeekViewProps {
  currentDate: Date
  events: Event[]
  onDateClick: (date: Date) => void
}

export function WeekView({ currentDate, events, onDateClick }: WeekViewProps) {
  const startOfWeek = new Date(currentDate)
  const day = startOfWeek.getDay()
  startOfWeek.setDate(currentDate.getDate() - day)

  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    weekDays.push(date)
  }

  const today = new Date()
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="bg-black/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <div className="grid grid-cols-7 bg-black/20">
        {weekDays.map((date, index) => (
          <div key={index} className="p-4 text-center border-r border-white/10 last:border-r-0">
            <div className="text-white/80 font-medium text-sm">{weekdays[index]}</div>
            <div className="text-white text-lg font-bold mt-1">{date.getDate()}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 min-h-[600px]">
        {weekDays.map((date, index) => {
          const dayEvents = events.filter((event) => {
            const eventDate = new Date(event.date)
            return eventDate.toDateString() === date.toDateString()
          })

          return (
            <CalendarDay
              key={index}
              date={date}
              day={date.getDate()}
              isCurrentMonth={true}
              isToday={date.toDateString() === today.toDateString()}
              events={dayEvents}
              onClick={() => onDateClick(date)}
            />
          )
        })}
      </div>
    </div>
  )
}
