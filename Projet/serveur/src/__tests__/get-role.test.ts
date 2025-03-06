import { Context, createMockContext, MockContext } from '../context'

interface CreateRoleTest {
	label: string
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
})

async function createRole(role: CreateRoleTest, ctx: Context) {
	return await ctx.prisma.role.create({
		data: role,
	})
}

test('Normalement on créé un nouveau rôle', async () => {
	const role = {
		id: 1,
		label: "RH"
	}
	mockCtx.prisma.role.create.mockResolvedValue(role)

	await expect(createRole(role, ctx)).resolves.toEqual(role)
})
