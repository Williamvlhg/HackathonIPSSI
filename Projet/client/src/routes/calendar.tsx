import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Site } from '@/types/site'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { format, isWithinInterval, parseISO } from 'date-fns'
import { useState } from 'react'

const queryClient = new QueryClient()

export const Route = createFileRoute('/calendar')({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <CalendarComponent />
    </QueryClientProvider>
  ),
})

function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const { data, error, isLoading } = useQuery<Site[]>({
    queryKey: ['sites'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/site/all')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      return result.data
    },
  })

  const currentWorkingSite =
    data?.filter(
      (site) =>
        date &&
        isWithinInterval(date, {
          start: parseISO(site.startDate),
          end: parseISO(site.endDate),
        })
    ) || []

  console.log(data)

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Calendrier</h1>

      <div className='flex space-x-4'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='flex-none rounded-md border'
        />
        <div className='p-4 flex-auto w-72'>
          <h2 className='text-xl font-semibold mb-2'>
            {date ? 'Événements du ' + format(date, 'dd/MM/yyyy') : 'Veuillez choisir une date'}
          </h2>
          <hr className='my-4 border-t-2 border-black' />
          {isLoading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error.message}</p>
          ) : currentWorkingSite.length > 0 ? (
            currentWorkingSite.map((site) => (
              <Card key={site.id} className='mb-2'>
                <CardHeader>
                  <section>
                    <CardTitle className='text-4xl'>{site.name}</CardTitle>
                  </section>

                  <hr className='my-6' />

                  <section>
                    <CardTitle className='text-xl'>Informations du chantier</CardTitle>
                    <article className='mt-4 grid grid-cols-[.1fr_1fr]'>
                      <p>Adresse</p>
                      <p>{site.address}</p>
                      <p>Début</p>
                      <p>{new Date(site.startDate).toLocaleDateString()}</p>
                      <p>Fin</p>
                      <p>{new Date(site.endDate).toLocaleDateString()}</p>
                    </article>
                  </section>

                  <hr className='my-6' />

                  <section>
                    <CardTitle className='text-xl'>Missions du chantier</CardTitle>
                  </section>

                  <hr className='my-6' />

                  <section>
                    <CardTitle className='text-xl'>Compétences du chantier</CardTitle>
                    <article className='mt-4 space-x-1'>
                      {site.skills.map((s, k) => (
                        <Badge key={k}>{s.label}</Badge>
                      ))}
                    </article>
                  </section>

                  <hr className='my-6' />

                  <section>
                    <CardTitle className='text-xl'>Ouvrier sur le chantier</CardTitle>
                    <article className='flex gap-2 mt-4'>
                      {site.workers.map((worker, key) => (
                        <section className='border rounded-lg p-4' key={key}>
                          <article className='flex items-center space-x-2'>
                            <h2>{worker.user[0].firstName}</h2>
                            <h2>{worker.user[0].lastName}</h2>
                          </article>
                          <article className='mt-2 space-x-2'>
                            {worker.skills.map((s, k) => (
                              <Badge key={k}>{s.label}</Badge>
                            ))}
                          </article>
                        </section>
                      ))}
                    </article>
                  </section>
                </CardHeader>
              </Card>
            ))
          ) : (
            <div className='mb-2'>{date ? " Aucun site n'est disponible ce jour-là " : ''}</div>
          )}
        </div>
      </div>
    </div>
  )
}
