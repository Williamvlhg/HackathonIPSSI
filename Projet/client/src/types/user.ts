import { Role } from './role'
import { WorkerType } from './worker'

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string

  role: Role
  worker?: WorkerType
}
