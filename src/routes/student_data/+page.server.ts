import { db } from "$lib/database";
import { eq } from 'drizzle-orm';
import { student } from "$lib/database/schema";
import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from 'sveltekit-superforms';
import { studentform } from '../../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from "@sveltejs/kit";
// import type {  } from "./$types";
export const load = (async () => {


	// no search no sort

	const students = await db.select().from(student);

	const form = await superValidate(zod(studentform));

	return {
		form, students
	};

}) satisfies PageServerLoad;

export const actions = {
	formadd: async (event) => {
		const form = await superValidate(event, zod(studentform));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const { email, rollNumber, subject, marks, name } = form.data;
		const emailDuplicates = await db.select().from(student).where(eq(student.email, email));
		const rollNumberDuplicates = await db.select().from(student).where(eq(student.rollNumber, parseInt(rollNumber)));
		if (emailDuplicates.length > 0) {
			return fail(400, {
				form,
				message: "Email already exists"
			});
		}
		if (rollNumberDuplicates.length > 0) {
			return fail(400, {
				form,
				message: "Roll Number already exists"
			});
		}
		// console.log("Form data: ", Object.fromEntries(data));
		await db.insert(student).values({
			rollNumber: parseInt(rollNumber),
			name,
			marks: parseInt(marks),
			email,
			subject
		});
		return {
			form
		};
	},
	add: async ({ request }) => {
		const data = await request.formData();
		const rollNumber = parseInt(data.get('rollNumber') as string);
		const name = data.get('text') as string;
		const marks = parseInt(data.get('number') as string);
		const email = data.get('email') as string;
		const subject = data.get('subject') as string;
		const emailDuplicates = await db.select().from(student).where(eq(student.email, email));
		const rollNumberDuplicates = await db.select().from(student).where(eq(student.rollNumber, rollNumber));
		if (emailDuplicates.length > 0) {
			return {
				message: "Email already exists"
			};
		}
		if (rollNumberDuplicates.length > 0) {
			return {
				msg: "Roll Number already exists"
			};
		}
		// console.log("Form data: ", Object.fromEntries(data));
		await db.insert(student).values({
			rollNumber,
			name,
			marks,
			email,
			subject
		});

	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const rollNumber = parseInt(data.get('rollNumber') as string);
		await db.delete(student).where(eq(student.rollNumber, rollNumber));
	}
} satisfies Actions;































































































































