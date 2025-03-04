import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { Box, User } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='space-y-8'>
      <h2 className='text-4xl'>Tableau de bord</h2>

      <section className='flex space-x-4 mt-8 w-full'>
        <article className='p-6 border rounded-lg space-y-2'>
          <User size={48} />
          <h2 className='text-2xl'>48</h2>
          <p>Nombre d&apos;employés</p>
        </article>
        <article className='p-6 border rounded-lg space-y-2'>
          <Box size={48} />
          <h2 className='text-2xl'>48</h2>
          <p>Nombre de chantier en cours</p>
        </article>
      </section>

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
              <TableRow>
                <TableCell className='font-medium'>1</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>En cours</TableCell>
                <TableCell>date</TableCell>
                <TableCell>date</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </article>
      </section>
    </div>
  )
}
