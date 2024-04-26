import { z } from "zod";

export const studentform = z.object({
	rollNumber: z.string(),
	name: z.string(),
	marks: z.string(),
	subject: z.string(),
	email: z.string(),
});

export type Studentschema = typeof studentform;
