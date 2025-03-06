import {Context, createMockContext, MockContext} from "../context";

interface DeleteUserTest {
	id: number
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

async function deleteUser(user: DeleteUserTest, ctx: Context) {
	return await ctx.prisma.user.delete({
		where: {
			id: user.id
		}
	})
}

test('Normalement on supprime un utilisateur', async () => {
	const user = {
		id: 1,
		firstName: 'Pierre',
		lastName: 'Rocher',
		password: 'pierre123',
		roleId: 1,
		workerId: 1,
		email: 'pierre.rocher@gmail.com'
	}

	mockCtx.prisma.user.delete.mockResolvedValue(user)

	await expect(deleteUser(user, ctx)).resolves.toEqual(user)
})