import { db } from "$lib/database";
import { asc, desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { student } from "$lib/database/schema";
import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from 'sveltekit-superforms';
import { studentform } from '../../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
// import type {  } from "./$types";
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
			const students = await db.select().from(student).orderBy(type == "desc" ? desc(student.name) : asc(student.name));
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

	console.log("Search: ", search);
	// search -> gayam
	if (search) {
		const students = await db.select().from(student).where(eq(student.name, search));
		return { students };
	}

	// no search no sort

	const students = await db.select().from(student);
	{
		return { students };
	}
	return {
		form: await superValidate(zod(studentform)),
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const rollNumber = parseInt(data.get('rollNumber') as string);
		const name = data.get('text') as string;
		const marks = parseInt(data.get('number') as string);
		const email = data.get('email') as string;
		const subjects = data.get('subjects') as string;
		// const MachineLearning = data.get("ml") as string;
		// const CyberSecurity = data.get("cs") as string;
		// const SoftwareEngineering = data.get("dm") as string;
		// const DataMining = data.get("se") as string;
		// const DataCommunication = data.get("dc") as string;
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
			subjects
		});
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const rollNumber = parseInt(data.get('rollNumber') as string);
		await db.delete(student).where(eq(student.rollNumber, rollNumber));
	},

	delete_all: async () => {
		await db.delete(student);
	}
} satisfies Actions;



