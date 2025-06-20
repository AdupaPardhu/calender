"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Download, Upload, Zap } from "lucide-react"
import { useEvents } from "@/components/event-context"

interface QuickActionsProps {
  onCreateEvent: () => void
}

export function QuickActions({ onCreateEvent }: QuickActionsProps) {
  const { events } = useEvents()

  const exportEvents = () => {
    const dataStr = JSON.stringify(events, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `calendar-events-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importEvents = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const importedEvents = JSON.parse(e.target?.result as string)
            localStorage.setItem("calendar-events", JSON.stringify(importedEvents))
            window.location.reload()
          } catch (error) {
            alert("Invalid JSON file")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const quickActions = [
    {
      title: "Quick Meeting",
      description: "30min meeting",
      icon: Clock,
      action: () => {
        // Auto-fill with meeting template
        onCreateEvent()
      },
    },
    {
      title: "All Day Event",
      description: "Full day event",
      icon: Calendar,
      action: () => {
        // Auto-fill with all-day template
        onCreateEvent()
      },
    },
    {
      title: "Export Events",
      description: "Download JSON",
      icon: Download,
      action: exportEvents,
    },
    {
      title: "Import Events",
      description: "Upload JSON",
      icon: Upload,
      action: importEvents,
    },
  ]

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="ghost"
              onClick={action.action}
              className="h-auto p-3 flex flex-col items-start text-left hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <action.icon className="h-4 w-4 text-purple-400" />
                <span className="text-white font-medium text-sm">{action.title}</span>
              </div>
              <span className="text-white/60 text-xs">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
