import { getEmployes } from '@/services/employe.service'
import { getSites } from '@/services/chantier.service'
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
import { isWithinInterval } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data: dataEmployes } = useQuery(['getEmployes'], getEmployes)
  const { data: dataSites } = useQuery(['getSites'], getSites)
  const currentDate = new Date()
  const currentlyWorkingSites = dataSites?.data.filter((site) =>
    isWithinInterval(currentDate, {
      start: new Date(site.startDate),
      end: new Date(site.endDate),
    })
  )

  return (
    <div className='space-y-8'>
      <h2 className='text-4xl'>Tableau de bord</h2>
      <div className='flex space-x-5 mt-5 w-full'>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderSync size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>{dataEmployes?.data.length}</CardContent>
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
  )
}

export default Index
