export interface Event {
  id: string
  title: string
  description?: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  duration: string // e.g., "1h", "30m", "2h"
  category?: "work" | "personal" | "meeting" | "reminder" | "other"
}
