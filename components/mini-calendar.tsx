"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Event } from "@/types/event"

interface MiniCalendarProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
  events: Event[]
}

export function MiniCalendar({ currentDate, onDateSelect, events }: MiniCalendarProps) {
  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = new Date(currentYear, currentMonth - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const days = []

  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const date = new Date(currentYear, currentMonth - 1, day)
    days.push({ date, day, isCurrentMonth: false })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    days.push({ date, day, isCurrentMonth: true })
  }

  // Next month's leading days
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day)
    days.push({ date, day, isCurrentMonth: false })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    onDateSelect(newDate)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {months[currentMonth]} {currentYear}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="text-center text-xs text-white/60 font-medium p-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((dayData, index) => {
          const isToday = dayData.date.toDateString() === today.toDateString()
          const dayEvents = getEventsForDate(dayData.date)
          const hasEvents = dayEvents.length > 0

          return (
            <button
              key={index}
              onClick={() => onDateSelect(dayData.date)}
              className={cn(
                "relative h-8 w-8 text-xs rounded-lg transition-all duration-200 hover:bg-white/10",
                dayData.isCurrentMonth ? "text-white" : "text-white/40",
                isToday && "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold",
                hasEvents && !isToday && "bg-blue-500/20 text-blue-300",
              )}
            >
              {dayData.day}
              {hasEvents && <div className="absolute bottom-0 right-0 h-1.5 w-1.5 bg-purple-400 rounded-full" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
