import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FolderSync } from 'lucide-react'
import { FolderClosed } from 'lucide-react'
import { PersonStanding } from 'lucide-react'
import AddSite from '@/features/chantiers/add/add-chantiers'
import DeleteSite from '@/features/chantiers/delete-chantier'
import UpdateSite from '@/features/chantiers/update/update-chantier'
import { Site } from '@/types/site'
import { useQuery } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
/*import {Form, FormControl, FormDescription, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";*/

const queryClient = new QueryClient()

export const Route = createFileRoute('/chantier')({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RouteComponent />
    </QueryClientProvider>
  ),
})

function RouteComponent() {
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
  console.log(data)
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((site, key) => (
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
                    <TableCell className='space-x-2'>
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
