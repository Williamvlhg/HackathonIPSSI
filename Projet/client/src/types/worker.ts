import { Skill } from './skill'

export type WorkerType = {
  id: number
  skills: Skill[]
  user: Array<{
    firstName: string
    lastName: string
  }>
}
