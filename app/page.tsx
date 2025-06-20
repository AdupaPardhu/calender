"use client"
import { Calendar } from "@/components/calendar"
import { EventProvider } from "@/components/event-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <EventProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Calendar />
        </div>
      </EventProvider>
    </ThemeProvider>
  )
}
