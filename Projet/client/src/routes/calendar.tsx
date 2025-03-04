import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
 
export const Route = createFileRoute("/calendar")({
  component: CalendarComponent,
});
 
function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
 
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Calendrier</h1>
     
      <div className="bg-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
 
      {date && (
        <p className="mt-4 text-lg">
          Date sélectionnée : <span className="font-bold">{format(date, "dd/MM/yyyy")}</span>
        </p>
      )}
    </div>
  );
}
