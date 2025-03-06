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
import AddSite from '@/features/chantiers/add/add-chantiers'
import DeleteSite from '@/features/chantiers/delete-chantier'
import UpdateSite from '@/features/chantiers/update/update-chantier'
import { getSites } from '@/services/chantier.service'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { FolderClosed, FolderSync, PersonStanding } from 'lucide-react'

const queryClient = new QueryClient()

export const Route = createFileRoute('/chantier')({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RouteComponent />
    </QueryClientProvider>
  ),
})

function RouteComponent() {
  const { data, isLoading, error } = getSites()

  return (
    <>
      <div className='flex space-x-5 mt-5 w-full'>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderSync size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>5</CardContent>
          <CardDescription className='px-6'>Nombre de chantier (en cours)</CardDescription>
        </Card>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <PersonStanding size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>37</CardContent>
          <CardDescription className='px-6'>Nombre d'employés affectés</CardDescription>
        </Card>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderClosed size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>67</CardContent>
          <CardDescription className='px-6'>Nombre totale de chantier</CardDescription>
        </Card>
      </div>
      <section className='flex gap-2 my-8 align-middle'>
        <AddSite />
      </section>

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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((site, key) => (
                  <TableRow key={key}>
                    <TableCell className='font-medium'>{site.id}</TableCell>
                    <TableCell>{site.name}</TableCell>
                    <TableCell>{site.address}</TableCell>
                    <TableCell>{site.startDate}</TableCell>
                    <TableCell>{site.endDate}</TableCell>
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
                          {site.workers.map((worker) => (
                            <p key={worker.id}>
                              {worker.user[0].firstName} - {worker.user[0].lastName}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <span className='text-gray-500 text-xs'>Aucun travailleur</span>
                      )}
                    </TableCell>
                    <TableCell className='space-x-2 flex items-center'>
                      <a href={`/chantier/${site.id}`} className={buttonVariants()}>
                        Détails
                      </a>
                      <UpdateSite currentSite={site} />
                      <DeleteSite siteId={site.id} />
                    </TableCell>
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
