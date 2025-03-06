import {Context, createMockContext, MockContext} from "../context";

interface DeleteRoleTest {
	id: number
	label: string
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
})

async function deleteRole(role: DeleteRoleTest, ctx: Context) {
	return await ctx.prisma.role.delete({
		where: {
			id: role.id
		}
	})
}

test('Normalement on supprime un rôle', async () => {
	const role = {
		id: 1,
		label: "RH"
	}

	mockCtx.prisma.role.delete.mockResolvedValue(role)

	await expect(deleteRole(role, ctx)).resolves.toEqual(role)
})