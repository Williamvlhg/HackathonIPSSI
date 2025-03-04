import { z } from "zod";

export const siteSchema = z.object({
  name: z.string(),
  address: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
