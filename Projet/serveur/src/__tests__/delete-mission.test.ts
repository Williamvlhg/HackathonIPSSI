import {Context, createMockContext, MockContext} from "../context";
import {Delete} from "@sinclair/typebox/value";

interface DeleteMissionTest {
	id: number
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

async function deleteMission(mission: DeleteMissionTest, ctx: Context) {
	return await ctx.prisma.mission.delete({
		where: {
			id: mission.id
		}
	})
}

test('Normalement on supprime une mission', async () => {
	const mission = {
		id: 1,
		title: "Chantier rénovation",
		startDate: "2025-03-06",
		endDate: "2025-05-02",
		workerId: 1,
		siteId: 1
	}

	mockCtx.prisma.mission.delete.mockResolvedValue(mission)

	await expect(deleteMission(mission, ctx)).resolves.toEqual(mission)
})