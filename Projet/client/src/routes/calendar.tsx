import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format, isWithinInterval, parseISO } from "date-fns";
import { Site } from '@/types/site';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
 
const queryClient = new QueryClient();

export const Route = createFileRoute("/calendar")({
  component: () => (
      <QueryClientProvider client={queryClient}>
        <CalendarComponent />
      </QueryClientProvider>
    ),
});


 
function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data, error, isLoading } = useQuery<Site[]>({
    queryKey: ['sites'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/site/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result.data;
    },
  });

  const currentWorkingSite = data?.filter(site => 
    date && isWithinInterval(date, {
      start: parseISO(site.startDate),
      end: parseISO(site.endDate)
    })
  ) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4" >Calendrier</h1>
     
      <div className="flex space-x-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex-none rounded-md border"
        />
        <div className="p-4 flex-auto w-72">
          <h2 className="text-xl font-semibold mb-2">
          {date ? ( "Événements du " + format(date, "dd/MM/yyyy")) : "Veuillez choisir une date"}
            </h2>
          <hr className="my-4 border-t-2 border-black" />
          {isLoading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error.message}</p>
          ) : (
            currentWorkingSite.length > 0 ? (
              currentWorkingSite.map(site => (
                <Card key={site.id} className="mb-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">{site.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {site.address}
                    <p className="font-semibold">Ouvriers sur site: </p>
                    {/* {site.workers.map(worker => (
                      <p key={worker.id}>{employee.firstName} {employee.lastName}</p>
                    ))} */}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="mb-2">
                {date ? " Aucun site n'est disponible ce jour-là " : ""}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
