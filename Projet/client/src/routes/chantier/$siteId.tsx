
import { getSite } from '@/services/chantier.service'
import AddMission from '@/features/missions/add/add-missions'
import UpdateMission from '@/features/missions/update/update-mission'
import DeleteMission from '@/features/missions/delete-mission'
import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider, useQueries } from '@tanstack/react-query'


const queryClient = new QueryClient()

export const Route = createFileRoute("/chantier/$siteId")({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RouteDetailComponent />
    </QueryClientProvider>
  ),
})

function RouteDetailComponent() {
  const { siteId } = Route.useParams()

  const { data: siteQuery, isLoading: siteLoading, error: siteError } = getSite(Number(siteId))

  const workerQueries = useQueries({
    queries: (siteQuery?.data.workers || []).map((worker) => ({
      queryKey: ['employe', worker.id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/user/${worker.id}`)
        return res.json()
      },
    })),
  })

  const missionQueries = useQueries({
    queries: (siteQuery?.data.missions || []).map((mission) => ({
      queryKey: ['employe', mission.workerId, 'mission', mission.id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/user/${mission.workerId}`)
        return res.json()
      },
    })),
  })


  return (
    <div className='container mx-auto py-10'>
      {siteLoading ? (
        <div>Loading...</div>
      ) : siteError ? (
        <div>Error: {siteError.message}</div>
      ) : (
        <div>
          <h2 className='text-4xl'>{siteQuery?.data.name}</h2>
          <p>{siteQuery?.data.address}</p>
          <p>
            Date de début:{' '}
            {siteQuery?.data.startDate
              ? new Date(siteQuery?.data.startDate).toLocaleDateString()
              : 'N/A'}
          </p>
          <p>
            Date de fin:{' '}
            {siteQuery?.data.endDate
              ? new Date(siteQuery?.data.endDate).toLocaleDateString()
              : 'N/A'}
          </p>
          <div>
            <h3>Compétences requises:</h3>
            {Array.isArray(siteQuery?.data.skills) && siteQuery?.data.skills.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {siteQuery?.data.skills.map((skill) => (
                  <span key={skill.id}>{skill.label}</span>
                ))}
              </div>
            ) : (
              <span className='text-gray-500 text-xs'>Aucune compétence</span>
            )}
          </div>
          <div>
            <h3>Employés:</h3>
            {Array.isArray(siteQuery?.data.workers) && siteQuery?.data.workers.length > 0 ? (
              <div>
                {workerQueries.map((query, index) => {
                  const worker = siteQuery?.data.workers[index]
                  if (query.isLoading) return <p key={worker.id}>Loading...</p>
                  if (query.error)
                    return (
                      <p key={worker.id}>
                        Error: {(query.error as Error).message}
                      </p>
                    )
                  return (
                    <p key={worker.id}>
                      {query.data.data.firstName} - {query.data.data.lastName}
                    </p>
                  )
                })}
              </div>
            ) : (
              <span className='text-gray-500 text-xs'>Aucun travailleur</span>
            )}
          </div>
          <div>
            <AddMission />
            <h3>Missions:</h3>
            {Array.isArray(siteQuery?.data.missions) && siteQuery?.data.missions.length > 0 ? (
              <div>
                {missionQueries.map((query, index) => {
                  const mission = siteQuery?.data.missions[index]
                  if (query.isLoading) return <p key={mission.id}>Loading...</p>
                  if (query.error)
                    return (
                      <p key={mission.id}>
                        Error: {(query.error as Error).message}
                      </p>
                    )
                  return (
                    <p key={mission.id}>
                      {mission.title} - {new Date(mission.startDate).toLocaleDateString()} à{' '}
                      {new Date(mission.endDate).toLocaleDateString()} par{' '}
                      {query.data.data.firstName} {query.data.data.lastName}
                      <UpdateMission currentMission={mission}/>
                      <DeleteMission
                        missionId={mission.id}
                      />
                    </p>
                  )
                })}
              </div>
            ) : (
              <span className='text-gray-500 text-xs'>Aucune mission</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RouteDetailComponent
