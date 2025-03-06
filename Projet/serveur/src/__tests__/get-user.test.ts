import { Context, createMockContext, MockContext } from '../context'

interface CreateUser {
  firstName: string
  lastName: string
  password: string
  roleId: number
  workerId: number
  email: string
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  })
}

test('Normalement on créé un nouvel utilisateur', async () => {
  const user = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'Lorem',
    roleId: 1,
    workerId: 1,
    email: 'john.doe@gmail.com',
  }
  mockCtx.prisma.user.create.mockResolvedValue(user)

  await expect(createUser(user, ctx)).resolves.toEqual(user)
})
