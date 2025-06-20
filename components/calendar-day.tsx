"use client"

import { cn } from "@/lib/utils"
import type { Event } from "@/types/event"
import { EventCard } from "@/components/event-card"

interface CalendarDayProps {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  events: Event[]
  onClick: () => void
}

export function CalendarDay({ date, day, isCurrentMonth, isToday, events, onClick }: CalendarDayProps) {
  const hasEvents = events.length > 0
  const hasConflicts = events.length > 1

  return (
    <div
      onClick={onClick}
      className={cn(
        "min-h-[120px] p-2 border-r border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/5 relative group",
        !isCurrentMonth && "opacity-40",
        isToday && "bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-2 ring-purple-400/50",
        hasEvents && !isToday && "bg-blue-500/5",
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className={cn(
            "text-sm font-medium",
            isCurrentMonth ? "text-white" : "text-white/60",
            isToday &&
              "text-white font-bold bg-purple-500 rounded-full h-6 w-6 flex items-center justify-center text-xs",
          )}
        >
          {day}
        </div>

        {hasEvents && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
            {events.length}
          </div>
        )}
      </div>

      <div className="space-y-1">
        {events.slice(0, 2).map((event, index) => (
          <div key={event.id} className="group/event">
            <EventCard event={event} isConflicted={hasConflicts} index={index} />
          </div>
        ))}

        {events.length > 2 && (
          <div className="text-xs text-white/60 bg-white/10 rounded px-2 py-1 hover:bg-white/20 transition-colors cursor-pointer">
            +{events.length - 2} more
          </div>
        )}

        {events.length === 0 && (
          <div className="text-xs text-white/20 italic opacity-0 group-hover:opacity-100 transition-opacity">
            Click to add event
          </div>
        )}
      </div>
    </div>
  )
}
