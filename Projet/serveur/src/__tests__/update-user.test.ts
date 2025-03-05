import { Context, createMockContext, MockContext } from '../context'

interface updateUser {
  id: number
  firstName: string
  lastName: string
  email: string
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

async function updateUser(user: updateUser, ctx: Context) {
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: user,
  })
}

test('On devrait pouvoir mettre à jour un utilisateur', async () => {
  const user = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'fake',
    roleId: 1,
    workerId: null,
  }

  const updatedUser = {
    ...user,
    password: 'password123',
    roleId: 1,
    workerId: null,
  }

  mockCtx.prisma.user.update.mockResolvedValue(updatedUser)

  await expect(updateUser(user, ctx)).resolves.toEqual(updatedUser)
})
