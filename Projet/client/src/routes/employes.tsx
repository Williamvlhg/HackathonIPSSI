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
import { createFileRoute } from '@tanstack/react-router'
import { isWithinInterval } from 'date-fns'
import { FolderClosed, FolderSync, PersonStanding } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { Mission } from '@/types/mission'
import { User } from '@/types/user'

import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/employes')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cookie] = useCookies(['user'])
  const missionsQuery = useQuery<{ data: Array<Mission> }>({
    queryKey: ['missions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/mission/all')
      return await res.json()
    },
  })
  const employesQuery = useQuery<{ data: Array<User> }>({
    queryKey: ['employes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/user/all')
      return await res.json()
    },
  })

  function isAvailable(user: User) {
    const currentDate = new Date()
    const missions = missionsQuery.data?.data.find((mission) => mission.workerId === user.id)
    console.log(missionsQuery.data?.data)
    console.log(missions)
    if (!missions) return true
    if (missions.endDate === 'finished') return true
    return !isWithinInterval(currentDate, {
      start: new Date(missions.startDate),
      end: new Date(missions.endDate),
    })
  }

  return (
    <>
      <div className='flex space-x-5 mt-5 w-full'>
        <Card className='p-5 space-y-2 w-75 transition-transform transform hover:scale-105 hover:bg-gray-100'>
          <CardHeader>
            <CardTitle>
              <FolderSync size={50} />
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>{employesQuery.data?.data.length}</CardContent>
          <CardDescription className='px-6'>Nombres total d'employés</CardDescription>
        </Card>
      </div>

      {cookie.user.role.label !== 'worker' && (
        <section className='flex gap-2 my-8 align-middle'>
          <AddEmploye />
        </section>
      )}

      {employesQuery.isLoading ? (
        <p>chargement</p>
      ) : (
        <section className='mt-8'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Compétences</TableHead>
                <TableHead>Disponibilité</TableHead>
                {cookie.user.role.label !== 'worker' && <TableHead>Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employesQuery.data?.data.map((user, key) => (
                <TableRow key={key}>
                  <TableCell className='font-medium'>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.label}</TableCell>
                  <TableCell className='flex flex-wrap items-center gap-1 max-w-lg'>
                    {user.worker?.skills.map((item, key) => <Badge key={key}>{item.label}</Badge>)}
                  </TableCell>
                  {/* à modifier quand le champs des missions est rajouté */}
                  <TableCell>
                    {isAvailable(user) ? (
                      <Badge variant='default'>Disponible</Badge>
                    ) : (
                      <Badge variant='destructive'>Non disponible</Badge>
                    )}
                  </TableCell>
                  {cookie.user.role.label !== 'worker' && (
                    <TableCell className='space-x-2'>
                      <UpdateEmploye currentUser={user} />
                      <DeleteEmploye userId={user.id} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </>
  )
}
