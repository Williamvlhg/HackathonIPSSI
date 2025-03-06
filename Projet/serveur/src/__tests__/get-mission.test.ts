import { Context, createMockContext, MockContext } from '../context'

interface CreateMission {
	title: string,
	startDate: string,
	endDate: string,
	workerId: number,
	siteId: number
}

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
})

async function createMission(mission: CreateMission, ctx: Context) {
	return await ctx.prisma.mission.create({
		data: mission,
	})
}

test('Normalement on créé une nouvelle mission', async () => {
	const mission = {
		id: 1,
		title: "Chantier rénovation",
		startDate: "2025-03-06",
		endDate: "2025-05-02",
		workerId: 1,
		siteId: 1
	}
	mockCtx.prisma.mission.create.mockResolvedValue(mission)

	await expect(createMission(mission, ctx)).resolves.toEqual(mission)
})
