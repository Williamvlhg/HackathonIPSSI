import { Skill } from './skill'
import { WorkerType } from './worker'
import { Mission } from './mission'

export type Site = {
  id: number
  name: string
  address: string
  startDate: string
  endDate: string
  workers: WorkerType[]
  skills: Skill[]
  missions: Mission[]
}
