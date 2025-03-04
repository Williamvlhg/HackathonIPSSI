import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from '@tanstack/react-router'
import { Box, User } from 'lucide-react'
import { FolderSync, FolderClosed, PersonStanding } from 'lucide-react';
export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='space-y-8'>
      <h2 className='text-4xl'>Tableau de bord</h2>
      <div className="flex space-x-5 mt-5 w-full">
        <Card className="p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100">
          <CardHeader>
            <CardTitle>
              <FolderSync size={50}/>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">5</CardContent>
          <CardDescription className="px-6">Nombre d'employés</CardDescription>
        </Card>
        <Card className="p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100">
          <CardHeader>
            <CardTitle>
              <PersonStanding size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl">37</CardContent>
          <CardDescription className="px-6">Nombre de chantiers (en cours)</CardDescription>
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
