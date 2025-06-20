"use client"

import { useEffect } from "react"

interface KeyboardShortcutsProps {
  onCreateEvent: () => void
  onNavigateMonth: (direction: "prev" | "next") => void
  onGoToToday: () => void
}

export function KeyboardShortcuts({ onCreateEvent, onNavigateMonth, onGoToToday }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key.toLowerCase()) {
        case "n":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            onCreateEvent()
          }
          break
        case "arrowleft":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            onNavigateMonth("prev")
          }
          break
        case "arrowright":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            onNavigateMonth("next")
          }
          break
        case "t":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            onGoToToday()
          }
          break
        case "escape":
          // Close any open modals
          const dialogs = document.querySelectorAll('[role="dialog"]')
          dialogs.forEach((dialog) => {
            const closeButton = dialog.querySelector('[aria-label="Close"]')
            if (closeButton instanceof HTMLElement) {
              closeButton.click()
            }
          })
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onCreateEvent, onNavigateMonth, onGoToToday])

  return null
}
