"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { EventCard } from "@/components/event-card"
import type { Event } from "@/types/event"

interface DayViewProps {
  currentDate: Date
  events: Event[]
  onDateClick: (date: Date) => void
}

export function DayView({ currentDate, events, onDateClick }: DayViewProps) {
  const dayEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === currentDate.toDateString()
    })
    .sort((a, b) => a.time.localeCompare(b.time))

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const today = new Date()
  const isToday = currentDate.toDateString() === today.toDateString()

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:00 ${period}`
  }

  const getEventsForHour = (hour: number) => {
    return dayEvents.filter((event) => {
      const eventHour = Number.parseInt(event.time.split(":")[0])
      return eventHour === hour
    })
  }

  return (
    <div className="bg-black/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <div className="bg-black/20 p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <p className="text-white/60 mt-1">
          {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""} scheduled
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="p-4">
          {hours.map((hour) => {
            const hourEvents = getEventsForHour(hour)
            const currentHour = isToday && new Date().getHours() === hour

            return (
              <div
                key={hour}
                className={`flex border-b border-white/5 min-h-[60px] ${currentHour ? "bg-purple-500/10" : ""}`}
              >
                <div className="w-20 p-3 text-right">
                  <span className={`text-sm ${currentHour ? "text-purple-300 font-bold" : "text-white/60"}`}>
                    {formatHour(hour)}
                  </span>
                </div>
                <div className="flex-1 p-3 border-l border-white/10">
                  <div className="space-y-2">
                    {hourEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
