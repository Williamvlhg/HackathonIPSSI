import { z } from "zod";

export const addSiteSchema = z.object({
  name: z.string(),
  address: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  skills: z.array(z.object({ id: z.number(), label: z.string() })),
  workers: z.array(z.object({ id: z.number() }))
});