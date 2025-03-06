import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { FolderSync, PersonStanding } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { Site } from '@/types/site'
import { User } from '@/types/user'
import { Mission } from '@/types/mission'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [cookie] = useCookies(['user'])

  // Query to fetch sites
  const sitesQuery = useQuery<{ data: Array<Site> }>({
    queryKey: ['sites'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/site/all')
      return await res.json()
    },
  })

  // Query to fetch employees/users
  const employesQuery = useQuery<{ data: Array<User> }>({
    queryKey: ['employes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/user/all')
      return await res.json()
    },
  })

  // Query to fetch missions
  const missionsQuery = useQuery<{ data: Array<Mission> }>({
    queryKey: ['missions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/mission/all')
      return await res.json()
    },
  })

  // Filter sites that are currently in progress
  const currentlyWorkingSites = sitesQuery.data?.data.filter(site =>
    new Date(site.startDate) <= new Date() && new Date(site.endDate) >= new Date()
  )

  // Filter missions for the logged-in worker (and currently in progress)
  const workerMissions = missionsQuery.data?.data.filter(mission =>
    mission.workerId === parseInt(cookie.user.id) &&
    new Date(mission.startDate) <= new Date() &&
    new Date(mission.endDate) >= new Date()
  )

  return (
    <>
      <div className='space-y-8'>
        {cookie.user.role.label !== 'worker' && (
          <div>
            <h2 className='text-4xl'>Tableau de bord</h2>
            <div className='flex space-x-5 mt-5 w-full'>
              <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
                <CardHeader>
                  <CardTitle>
                    <FolderSync size={50} />
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-3xl'>{employesQuery.data?.data.length}</CardContent>
                <CardDescription className='px-6'>Nombre d'employés</CardDescription>
              </Card>
              <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
                <CardHeader>
                  <CardTitle>
                    <PersonStanding size={50} />
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-3xl'>{currentlyWorkingSites?.length}</CardContent>
                <CardDescription className='px-6'>Nombre de chantiers (en cours)</CardDescription>
              </Card>
            </div>

            <section>
              <h3 className='text-2xl'>Chantier en cours</h3>
              <article className='p-6 border rounded-lg mt-4'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Chantier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Début</TableHead>
                      <TableHead>Fin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentlyWorkingSites?.map((site, index) => (
                      <TableRow key={site.id}>
                        <TableCell className='font-medium'>{index + 1}</TableCell>
                        <TableCell>{site.name}</TableCell>
                        <TableCell>En cours</TableCell>
                        <TableCell>{new Date(site.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(site.endDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </article>
            </section>
          </div>
        )}

        {cookie.user.role.label === 'worker' && (
          <div>
            <h2 className='text-4xl'>Planning</h2>
          

            {/* New section: Cards for worker's ongoing missions */}
            <section className='mt-8'>
              <h3 className='text-2xl'>Missions en cours</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {workerMissions && workerMissions.length > 0 ? (
                  workerMissions.map(mission => (
                    <Card key={mission.id} className='p-5'>
                      <CardHeader>
                        <CardTitle>{mission.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Début : {new Date(mission.startDate).toLocaleDateString()}
                        </p>
                        <p>
                          Fin : {new Date(mission.endDate).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>Aucune mission en cours</p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  )
}

export default Index
