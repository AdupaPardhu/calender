"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, TrendingUp, Users } from "lucide-react"
import { useEvents } from "@/components/event-context"

export function EventStatistics() {
  const { events } = useEvents()

  const today = new Date()
  const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const todayEvents = events.filter((event) => new Date(event.date).toDateString() === today.toDateString()).length

  const weekEvents = events.filter((event) => new Date(event.date) >= thisWeek && new Date(event.date) <= today).length

  const monthEvents = events.filter((event) => new Date(event.date) >= thisMonth).length

  const upcomingEvents = events.filter((event) => new Date(event.date) > today).length

  const stats = [
    {
      title: "Today's Events",
      value: todayEvents,
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "This Week",
      value: weekEvents,
      icon: Clock,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      title: "This Month",
      value: monthEvents,
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "Upcoming",
      value: upcomingEvents,
      icon: Users,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
