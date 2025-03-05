import { Button } from '@/components/ui/button'
import { deleteEmploye } from '@/services/employe.service'
import { FC, JSX } from 'react'

interface IDeleteEmployProps {
  userId: number
}

const DeleteEmploy: FC<IDeleteEmployProps> = ({ userId }): JSX.Element => {
  const { mutate } = deleteEmploye(userId)

  return <Button onClick={() => mutate()}>Supprimer</Button>
}

export default DeleteEmploy
