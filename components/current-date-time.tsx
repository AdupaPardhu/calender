"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"

export function CurrentDateTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/10 rounded-lg">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-white">Current Date & Time</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/90">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formatDate(currentTime)}</span>
        </div>

        <div className="flex items-center gap-2 text-white/90">
          <Clock className="h-4 w-4" />
          <span className="text-lg font-mono">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  )
}
