import { z } from "zod";

export const skillSchema = z.object({
  label: z.string(),
});
