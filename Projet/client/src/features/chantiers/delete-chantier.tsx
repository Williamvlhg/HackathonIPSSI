import { Button } from '@/components/ui/button'
import { deleteSite } from '@/services/chantier.service'
import { FC, JSX } from 'react'

interface IDeleteChantierProps {
  siteId: number
}

const DeleteChantier: FC<IDeleteChantierProps> = ({ siteId }): JSX.Element => {
  const { mutate } = deleteSite(siteId)

  return <Button onClick={() => mutate()}>Supprimer</Button>
}

export default DeleteChantier
