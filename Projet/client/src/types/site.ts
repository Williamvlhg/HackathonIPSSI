import { Skill } from './skill'
import { WorkerType } from './worker'

export type Site = {
  id: number
  name: string
  address: string
  startDate: string
  endDate: string
  workers: WorkerType[]
  skills: Skill[]
}
