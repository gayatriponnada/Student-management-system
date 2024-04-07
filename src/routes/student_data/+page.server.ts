import { db } from "$lib/server";
import { asc, desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { student } from "$lib/server/schema";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ url }) => {
	const sort = url.searchParams.get('sort');
	const search = url.searchParams.get('search');

	// http://localhost:5173/student_data?sort=desc:marks&search=gayam

	// sort -> desc:marks
	// search -> gayam

	if (sort) {
		const [type, column] = sort.split(':');
		// type -> desc, column -> marks
		if (column == "marks") {
			const students = await db.select().from(student).orderBy(type == "desc" ? desc(student.marks) : asc(student.marks));
			return {
				students
			};
		}
		// type -> desc, column -> name
		if (column == 'name') {
			const students = await db.select().from(student).orderBy(type == "asc" ? desc(student.name) : asc(student.name));
			return {
				students
			};
		}
		// type -> desc, column -> email
		if (column == 'email') {
			const students = await db.select().from(student).orderBy(type == "desc" ? desc(student.email) : asc(student.email));
			return {
				students
			};
		}
	}

	// search -> gayam
	if (search) {
		const students = await db.select().from(student).where(eq(student.name, search));
		return { students };
	}

	// no search no sort
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
				message: "Please valid data"
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



