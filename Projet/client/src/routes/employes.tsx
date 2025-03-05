import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AddEmploye from '@/features/employes/add/add-employes'
import DeleteEmploye from '@/features/employes/delete-employe'
import UpdateEmploye from '@/features/employes/update/update-employe'
import { getEmployes } from '@/services/employe.service'
import { createFileRoute } from '@tanstack/react-router'

import { FolderClosed, FolderSync, PersonStanding } from 'lucide-react'

export const Route = createFileRoute('/employes')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = getEmployes()

  return (
    <>
      <div className='flex space-x-5 mt-5 w-full'>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderSync size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>{data?.data.length}</CardContent>
          <CardDescription className='px-6'>Nombres total d'employés</CardDescription>
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
          <CardDescription className='px-6'>Nombre d'employés disponibles</CardDescription>
        </Card>
      </div>

      <section className='flex gap-2 my-8 align-middle'>
        <AddEmploye />
      </section>

      {isLoading ? (
        <p>chargement</p>
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Compétences</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((user, key) => (
                <TableRow key={key}>
                  <TableCell className='font-medium'>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.label}</TableCell>
                  <TableCell className='flex flex-wrap items-center gap-1 max-w-lg'>
                    {user.worker?.skills.map((item, key) => <Badge key={key}>{item.label}</Badge>)}
                  </TableCell>
                  <TableCell className='space-x-2'>
                    <UpdateEmploye currentUser={user} />
                    <DeleteEmploye userId={user.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </>
  )
}
