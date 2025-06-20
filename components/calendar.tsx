"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarGrid } from "@/components/calendar-grid"
import { EventModal } from "@/components/event-modal"
import { CurrentDateTime } from "@/components/current-date-time"
import { EventSidebar } from "@/components/event-sidebar"
import { useEvents } from "@/components/event-context"
import { cn } from "@/lib/utils"
import { MiniCalendar } from "@/components/mini-calendar"
import { ViewToggle } from "@/components/view-toggle"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)
  const { events, editingEvent, setEditingEvent } = useEvents()
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [showMiniCalendar, setShowMiniCalendar] = useState(true)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        if (viewMode === "day") {
          newDate.setDate(prev.getDate() - 1)
        } else if (viewMode === "week") {
          newDate.setDate(prev.getDate() - 7)
        } else {
          newDate.setMonth(prev.getMonth() - 1)
        }
      } else {
        if (viewMode === "day") {
          newDate.setDate(prev.getDate() + 1)
        } else if (viewMode === "week") {
          newDate.setDate(prev.getDate() + 7)
        } else {
          newDate.setMonth(prev.getMonth() + 1)
        }
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsEventModalOpen(true)
  }

  const handleCreateEvent = () => {
    setSelectedDate(new Date())
    setEditingEvent(null)
    setIsEventModalOpen(true)
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getViewTitle = () => {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else if (viewMode === "week") {
      const startOfWeek = new Date(currentDate)
      const day = startOfWeek.getDay()
      startOfWeek.setDate(currentDate.getDate() - day)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    }
    return `${months[currentMonth]} ${currentYear}`
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between p-4 lg:p-6 bg-black/20 backdrop-blur-xl border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 lg:gap-4 min-w-0">
            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth("prev")}
                className="text-white hover:bg-white/10 transition-all duration-200 h-8 w-8 lg:h-10 lg:w-10"
              >
                <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth("next")}
                className="text-white hover:bg-white/10 transition-all duration-200 h-8 w-8 lg:h-10 lg:w-10"
              >
                <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </div>

            <h1 className="text-lg lg:text-2xl font-bold text-white truncate">{getViewTitle()}</h1>

            <Button
              variant="outline"
              onClick={goToToday}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200 text-xs lg:text-sm px-2 lg:px-4"
            >
              Today
            </Button>

            <div className="hidden lg:block">
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-200 w-48 lg:w-64"
              />
            </div>

            <Button
              onClick={handleCreateEvent}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25 px-2 lg:px-4"
            >
              <Plus className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">New Event</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-white hover:bg-white/10 transition-all duration-200 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Mobile View Toggle */}
        <div className="lg:hidden p-4 bg-black/10 border-b border-white/10">
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Mobile Search */}
        <div className="md:hidden p-4 bg-black/10 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 flex gap-4 lg:gap-6 p-4 lg:p-6 min-h-0 overflow-hidden">
          {showMiniCalendar && viewMode === "month" && (
            <div className="w-64 lg:w-80 hidden xl:block flex-shrink-0">
              <MiniCalendar
                currentDate={currentDate}
                onDateSelect={(date) => {
                  setCurrentDate(date)
                  setSelectedDate(date)
                }}
                events={filteredEvents}
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <CalendarGrid
              currentDate={currentDate}
              events={filteredEvents}
              onDateClick={handleDateClick}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "w-80 bg-black/20 backdrop-blur-xl border-l border-white/10 transition-all duration-300 flex-shrink-0",
          showSidebar ? "translate-x-0" : "translate-x-full",
          "fixed lg:relative top-0 right-0 h-full z-50 lg:z-auto",
        )}
      >
        <div className="p-4 lg:p-6 h-full overflow-hidden flex flex-col">
          <div className="lg:hidden mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(false)}
              className="text-white hover:bg-white/10"
            >
              ← Close
            </Button>
          </div>

          <div className="flex-1 overflow-hidden">
            <CurrentDateTime />
            <EventSidebar
              events={filteredEvents}
              onEventEdit={(event) => {
                setEditingEvent(event)
                setIsEventModalOpen(true)
              }}
              onCreateEvent={handleCreateEvent}
            />
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowSidebar(false)} />
      )}

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts onCreateEvent={handleCreateEvent} onNavigateMonth={navigateMonth} onGoToToday={goToToday} />

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false)
          setEditingEvent(null)
          setSelectedDate(null)
        }}
        selectedDate={selectedDate}
      />
    </div>
  )
}
