"use client"

import { cn } from "@/lib/utils"
import type { Event } from "@/types/event"
import { Clock, AlertTriangle } from "lucide-react"

interface EventCardProps {
  event: Event
  isConflicted?: boolean
  index?: number
}

const eventColors = [
  "bg-gradient-to-r from-blue-500 to-cyan-500",
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-green-500 to-emerald-500",
  "bg-gradient-to-r from-orange-500 to-red-500",
  "bg-gradient-to-r from-indigo-500 to-purple-500",
  "bg-gradient-to-r from-teal-500 to-blue-500",
]

export function EventCard({ event, isConflicted, index = 0 }: EventCardProps) {
  const colorClass = eventColors[index % eventColors.length]

  return (
    <div
      className={cn(
        "text-xs p-2 rounded-lg text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl cursor-pointer",
        colorClass,
        isConflicted && "ring-2 ring-yellow-400/50 animate-pulse",
      )}
      title={`${event.title} - ${event.time} (${event.duration})`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium truncate flex-1">{event.title}</span>
        {isConflicted && <AlertTriangle className="h-3 w-3 text-yellow-300 flex-shrink-0 ml-1" />}
      </div>
      <div className="flex items-center gap-1 mt-1 opacity-90">
        <Clock className="h-3 w-3 flex-shrink-0" />
        <span className="truncate">{event.time}</span>
      </div>
    </div>
  )
}
