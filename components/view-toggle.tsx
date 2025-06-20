"use client"

import { Button } from "@/components/ui/button"
import { Calendar, CalendarDays, Clock } from "lucide-react"

interface ViewToggleProps {
  viewMode: "month" | "week" | "day"
  onViewChange: (mode: "month" | "week" | "day") => void
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  const views = [
    { mode: "month" as const, icon: Calendar, label: "Month" },
    { mode: "week" as const, icon: CalendarDays, label: "Week" },
    { mode: "day" as const, icon: Clock, label: "Day" },
  ]

  return (
    <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
      {views.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          variant={viewMode === mode ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange(mode)}
          className={
            viewMode === mode
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <Icon className="h-4 w-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  )
}
