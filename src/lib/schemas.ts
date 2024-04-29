import { z } from "zod";

export const studentform = z.object({
	rollNumber: z
		.string()
		.min(1, 'required')
		.refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number',
		})
		.refine(
			(val) => {
				const number = parseInt(val, 10);
				return number >= 0;
			},
			{
				message: 'Expected non-negative',
			},
		),
	name: z.string(),
	marks: z
		.string()
		.min(1, 'required')
		.refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number',
		})
		.refine(
			(val) => {
				const number = parseInt(val, 10);
				return number >= 0;
			},
			{
				message: 'Expected non-negative',
			},
		),
	subject: z.string(),
	email: z.string(),
});

export type Studentschema = typeof studentform;
