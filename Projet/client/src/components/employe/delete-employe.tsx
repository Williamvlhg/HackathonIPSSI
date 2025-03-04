import { FC, JSX } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getEmployes } from './get-cemploye'

interface IDeleteEmployProps {
  userId: number
}

const DeleteEmploy: FC<IDeleteEmployProps> = ({ userId }): JSX.Element => {
  const { refetch } = getEmployes()

  const { mutate } = useMutation({
    mutationKey: ['deleteEmploye'],
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })

      refetch()
      toast('Utilisateur supprimé')
      return await res.json()
    },
  })

  return <Button onClick={() => mutate()}>Supprimer</Button>
}

export default DeleteEmploy
