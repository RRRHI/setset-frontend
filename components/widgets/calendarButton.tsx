"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export function CalendarButton() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <div className="relative ml-auto">
      
      <Button
        variant="outline"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="flex items-center gap-2 px-3"
      >
        <CalendarIcon className="size-4" />
        <span className="whitespace-nowrap">
          {date ? format(date, "PPP") : "Calendar"}
        </span>
      </Button>

      {isCalendarOpen && (
        <div className="absolute right-0 top-10 z-50 rounded-md border bg-background shadow-lg">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate)
              setIsCalendarOpen(false) 
            }}
          />
        </div>
      )}
    </div>
  )
}
