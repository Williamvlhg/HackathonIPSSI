import { Badge } from '@/components/ui/badge'
import AddMission from '@/features/missions/add/add-missions'
import { getSite } from '@/services/chantier.service'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const queryClient = new QueryClient()

export const Route = createFileRoute('/chantier/$siteId')({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RouteDetailComponent />
    </QueryClientProvider>
  ),
})

function RouteDetailComponent() {
  const { siteId } = Route.useParams()

  const { data: siteQuery, isLoading: siteLoading, error: siteError } = getSite(Number(siteId))

  if (siteLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className=''>
      {siteLoading ? (
        <div>Loading...</div>
      ) : siteError ? (
        <div>Error: {siteError.message}</div>
      ) : (
        <section>
          <article>
            <h2 className='text-4xl'>{siteQuery?.data.name}</h2>
          </article>

          <hr className='my-6' />

          <article className='rounded-lg p-4 border'>
            <h3 className='text-2xl'>Informations du chantier</h3>
            <div className='grid grid-cols-[.1fr_1fr] mt-4'>
              <p>Adresse</p>
              <p>{siteQuery?.data.address}</p>
              <p>Date début</p>
              <p>{siteQuery?.data.startDate}</p>
              <p>Date début</p>
              <p>{siteQuery?.data.endDate}</p>
            </div>
          </article>

          <hr className='my-6' />

          <article className='rounded-lg p-4 border'>
            <h3 className='text-2xl'>Compétences du chantier</h3>
            <div className='flex flex-wrap gap-2 mt-4'>
              {siteQuery?.data.skills.map((s, k) => <Badge key={k}>{s.label}</Badge>)}
            </div>
          </article>

          <hr className='my-6' />

          <article className='rounded-lg p-4 border'>
            <div className='flex gap-4 items-center'>
              <h3 className='text-2xl'>Missions</h3>
              <AddMission />
            </div>

            <div className='flex items-center gap-4'>
              {siteQuery?.data.missions.map((m, k) => (
                <div key={k} className='border p-4 rounded-lg mt-4 w-xl'>
                  <h3 className='text-xl'>{m.title}</h3>
                  <div className='flex items-center justify-between mt-2'>
                    <div>
                      <p>Adresse</p>
                      <p>{siteQuery?.data.address}</p>
                    </div>

                    <div>
                      <p>Date début</p>
                      <p>{siteQuery?.data.startDate}</p>
                    </div>

                    <div>
                      <p>Date début</p>
                      <p>{siteQuery?.data.endDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}
    </div>
  )
}

export default RouteDetailComponent
