import { db } from "$lib/server";
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { student } from "$lib/server/schema";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ url }) => {
	const sort = url.searchParams.get('sort');
	const search = url.searchParams.get('search');

	if (sort) {
		const students = await db.select().from(student).orderBy(desc(student.marks));
		return {
			students
		};
	}

	if (search) {
		const students = await db.select().from(student).where(eq(student.name, search));
		return { students };
	}

	const students = await db.select().from(student);
	return {
		students
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const name = data.get('text') as string;
		const marks = parseInt(data.get('number') as string);
		const email = data.get('email') as string;
		const nameRegex = /^[A-Za-z]+$/;
		if (!name || !marks || !id || marks < 0 || marks > 100 || !nameRegex.test(name)) {
			return {
				message: "Please enter proper data"
			};
		}
		await db.insert(student).values({
			id,
			name,
			marks,
			email
		});
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = (data.get('id') as string);
		await db.delete(student).where(eq(student.id, id));
	},

	delete_all: async () => {
		await db.delete(student);
	}
} satisfies Actions;
