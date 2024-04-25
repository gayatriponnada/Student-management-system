import { z } from "zod";
// import { createId } from '@paralleldrive/cuid2';
// import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const studentform = z.object({
	// id: z.string()
	// 	.primaryKey()
	// 	.$defaultFn(() => createId()),
	rollNumber: z.number(),
	name: z.string(),
	marks: z.number(),
	email: z.string(),
	subjects: z.string(),
});

export type SelectStudent = z.infer<typeof studentform>;
