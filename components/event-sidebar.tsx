"use client"

import { useState } from "react"
import type { Event } from "@/types/event"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"
import { useEvents } from "@/components/event-context"
import { EventStatistics } from "@/components/event-statistics"
import { QuickActions } from "@/components/quick-actions"

interface EventSidebarProps {
  events: Event[]
  onEventEdit: (event: Event) => void
  onCreateEvent: () => void
}

export function EventSidebar({ events, onEventEdit, onCreateEvent }: EventSidebarProps) {
  const { deleteEvent } = useEvents()
  const [filter, setFilter] = useState<"all" | "today" | "upcoming">("all")

  const today = new Date().toISOString().split("T")[0]

  const filteredEvents = events
    .filter((event) => {
      switch (filter) {
        case "today":
          return event.date === today
        case "upcoming":
          return event.date >= today
        default:
          return true
      }
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50"
      case "personal":
        return "bg-green-500/20 text-green-300 border-green-500/50"
      case "meeting":
        return "bg-purple-500/20 text-purple-300 border-purple-500/50"
      case "reminder":
        return "bg-orange-500/20 text-orange-300 border-orange-500/50"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50"
    }
  }

  return (
    <div className="space-y-4">
      <EventStatistics />
      <QuickActions onCreateEvent={onCreateEvent} />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
        <div className="flex gap-1">
          {(["all", "today", "upcoming"] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className={
                filter === filterType
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events found</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white truncate">{event.title}</h4>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEventEdit(event)}
                      className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {event.description && (
                  <p
                    className="text-sm text-white/70 mb-3 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {event.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>
                    {event.time} ({event.duration})
                  </span>
                </div>

                <Badge className={getCategoryColor(event.category || "other")}>{event.category || "other"}</Badge>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
