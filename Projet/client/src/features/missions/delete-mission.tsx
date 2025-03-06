import { Button } from '@/components/ui/button'
import { deleteMission } from '@/services/mission.service'
import { FC, JSX } from 'react'

interface IDeleteChantierProps {
  missionId: number
}

const DeleteMission: FC<IDeleteChantierProps> = ({ missionId }): JSX.Element => {
  const { mutate } = deleteMission(missionId)

  return <Button onClick={() => mutate()}>Supprimer</Button>
}

export default DeleteMission
