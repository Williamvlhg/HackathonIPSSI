import { Context, createMockContext, MockContext } from '../context'

interface CreateSkillTest {
	label: string
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
})

async function createSkill(skill: CreateSkillTest, ctx: Context) {
	return await ctx.prisma.skill.create({
		data: skill,
	})
}

test('Normalement on créé une nouvelle compétence', async () => {
	const skill = {
		id: 1,
		label: "Electricien"
	}
	mockCtx.prisma.skill.create.mockResolvedValue(skill)

	await expect(createSkill(skill, ctx)).resolves.toEqual(skill)
})
