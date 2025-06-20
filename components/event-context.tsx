"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Event } from "@/types/event"

interface EventContextType {
  events: Event[]
  addEvent: (event: Omit<Event, "id">) => void
  updateEvent: (id: string, event: Omit<Event, "id">) => void
  deleteEvent: (id: string) => void
  editingEvent: Event | null
  setEditingEvent: (event: Event | null) => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync and project updates",
    date: "2025-01-20",
    time: "14:00",
    duration: "1h",
    category: "meeting",
  },
  {
    id: "2",
    title: "Project Review",
    description: "Review project deliverables and timeline",
    date: "2025-01-20",
    time: "14:00",
    duration: "30m",
    category: "work",
  },
  {
    id: "3",
    title: "Lunch with Sarah",
    description: "Catch up over lunch at the new restaurant",
    date: "2025-01-21",
    time: "12:30",
    duration: "1h",
    category: "personal",
  },
  {
    id: "4",
    title: "Gym Workout",
    description: "Leg day at the gym",
    date: "2025-01-22",
    time: "18:00",
    duration: "1h",
    category: "personal",
  },
  {
    id: "5",
    title: "Client Presentation",
    description: "Present quarterly results to key clients",
    date: "2025-01-23",
    time: "10:00",
    duration: "2h",
    category: "work",
  },
]

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    // Load events from localStorage or use sample data
    const savedEvents = localStorage.getItem("calendar-events")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    } else {
      setEvents(sampleEvents)
    }
  }, [])

  useEffect(() => {
    // Save events to localStorage whenever events change
    localStorage.setItem("calendar-events", JSON.stringify(events))
  }, [events])

  const addEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const updateEvent = (id: string, eventData: Omit<Event, "id">) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...eventData, id } : event)))
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        editingEvent,
        setEditingEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}
