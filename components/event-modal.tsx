"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEvents } from "@/components/event-context"
import type { Event } from "@/types/event"
import { Trash2, Save, X, Calendar } from "lucide-react"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
}

export function EventModal({ isOpen, onClose, selectedDate }: EventModalProps) {
  const { addEvent, updateEvent, deleteEvent, editingEvent } = useEvents()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "1h",
    category: "work",
  })

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description || "",
        date: editingEvent.date,
        time: editingEvent.time,
        duration: editingEvent.duration,
        category: editingEvent.category || "work",
      })
    } else if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]
      const now = new Date()
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

      setFormData((prev) => ({
        ...prev,
        date: dateStr,
        time: timeStr,
        title: "",
        description: "",
        duration: "1h",
        category: "work",
      }))
    }
  }, [editingEvent, selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert("Please enter a title for the event")
      return
    }

    const eventData: Omit<Event, "id"> = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      category: formData.category as Event["category"],
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData)
    } else {
      addEvent(eventData)
    }

    onClose()
  }

  const handleDelete = () => {
    if (editingEvent && confirm("Are you sure you want to delete this event?")) {
      deleteEvent(editingEvent.id)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {editingEvent ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white/80">
              Event Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white/80">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Event description (optional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-white/80">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="time" className="text-white/80">
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration" className="text-white/80">
                Duration
              </Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl">
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="2h">2 hours</SelectItem>
                  <SelectItem value="4h">4 hours</SelectItem>
                  <SelectItem value="8h">All day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="text-white/80">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl">
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            {editingEvent && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}

            <div className="flex gap-2 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingEvent ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
