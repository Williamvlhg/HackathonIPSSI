import {Context, createMockContext, MockContext} from "../context";

interface DeleteSkillTest {
	id: number
	label: string
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
})

async function deleteSkill(skill: DeleteSkillTest, ctx: Context) {
	return await ctx.prisma.skill.delete({
		where: {
			id: skill.id
		}
	})
}

test('Normalement on supprime une compétence', async () => {
	const skill = {
		id: 1,
		label: "Maçon"
	}

	mockCtx.prisma.skill.delete.mockResolvedValue(skill)

	await expect(deleteSkill(skill, ctx)).resolves.toEqual(skill)
})