import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getSites } from '@/services/chantier.service'
import AddSite from '@/features/chantiers/add/add-chantiers'
import DeleteSite from '@/features/chantiers/delete-chantier'
import UpdateSite from '@/features/chantiers/update/update-chantier'
import { createFileRoute } from '@tanstack/react-router'
import { FolderClosed, FolderSync, PersonStanding } from 'lucide-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { isWithinInterval } from 'date-fns'
import { useCookies } from 'react-cookie'

const queryClient = new QueryClient()

export const Route = createFileRoute('/chantier/')({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RouteComponent />
    </QueryClientProvider>
  ),
})

function RouteComponent() {
  const { data, isLoading, error } = getSites()
  const [cookie] = useCookies(['user'])
  const currentDate = new Date()
  const currentlyWorkingSites = data?.data.filter(site =>
    isWithinInterval(currentDate, {
      start: new Date(site.startDate),
      end: new Date(site.endDate),
    })
  )

  return (
    <>
      <div className='flex space-x-5 mt-5 w-full'>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderSync size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">{currentlyWorkingSites?.length}</CardContent>
          <CardDescription className="px-6">Nombre de chantier (en cours)</CardDescription>
        </Card>
       
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderClosed size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">{data?.data.length}</CardContent>
          <CardDescription className="px-6">Nombre totale de chantier</CardDescription>
        </Card>
      </div>
      {cookie.user.role.label !== 'worker' && (
        <section className='flex gap-2 my-8 align-middle'>
          <AddSite />
        </section>
      )}

      <div className='container mx-auto py-10'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <section>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Nom du chantier</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Date de fin</TableHead>
                  <TableHead>Compétences requises</TableHead>
                  <TableHead>Employés</TableHead>
                  {cookie.user.role.label !== 'worker' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((site, key) => (
                  <TableRow key={key}>
                    <TableCell className='font-medium'>{site.id}</TableCell>
                    <TableCell>{site.name}</TableCell>
                    <TableCell>{site.address}</TableCell>
                    <TableCell>{new Date(site.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(site.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {Array.isArray(site.skills) && site.skills.length > 0 ? (
                        <div className='flex flex-wrap gap-2'>
                          {site.skills.map((skill) => (
                            <span key={skill.id}>{skill.label}</span>
                          ))}
                        </div>
                      ) : (
                        <span className='text-gray-500 text-xs'>Aucune compétence</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {Array.isArray(site.workers) && site.workers.length > 0 ? (
                        <div>
                          {site.workers.map((worker) => {
                            const firstName = worker.user?.[0]?.firstName || 'N/A'
                            const lastName = worker.user?.[0]?.lastName || ''
                            return (
                              <p key={worker.id}>
                                {firstName} {lastName && `- ${lastName}`}
                              </p>
                            )
                          })}
                        </div>
                      ) : (
                        <span className='text-gray-500 text-xs'>Aucun travailleur</span>
                      )}
                    </TableCell>

                    {cookie.user.role.label !== 'worker' && (
                      <TableCell className='space-x-2 flex items-center'>
                        <a href={`/chantier/${site.id}`} className={buttonVariants()}>
                          Détails
                        </a>
                        <UpdateSite currentSite={site} />
                        <DeleteSite siteId={site.id} />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}
      </div>
    </>
  )
}

export default RouteComponent
