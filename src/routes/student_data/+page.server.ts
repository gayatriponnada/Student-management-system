import { db } from "$lib/server";
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
// import { sql } from "drizzle-orm";
import { student } from "$lib/server/schema";
import type { PageServerLoad, Actions } from "./$types";
// import type { Student } from "./type";

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

	// sort: async () => {
	// 	await db.select().from(student).orderBy(student.marks);
	// },
	// const cookie = cookies.get('student');
	// const student = cookie ? JSON.parse(cookie) as Student[] : [] as Student[];
	// student.sort((a, b) => a.name.localeCompare(b.name));
	// cookies.set('student', JSON.stringify(student), { path: '/' });


	// 	const cookie = cookies.get('student');
	// 	const student = cookie ? JSON.parse(cookie) as Student[] : [] as Student[];
	// 	const foundStudent = student.find(student => student.name === nameToSearch);
	// 	if (foundStudent) {
	// 		return {
	// 			found: foundStudent.name
	// 		};
	// 	}
	// 	else {
	// 		return {
	// 			found: "Student not found"
	// 		};
	// 	}
	// },

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = (data.get('id') as string);
		await db.delete(student).where(eq(student.id, id));
	},

	// 	// const name = (data.get('text') as string);
	// 	// const marks = parseInt(data.get('number') as string);
	// 	// const email = data.get('email') as string;
	// 	await db.delete(student).where(lt(student.id, 1));
	// const cookie = cookies.get('student');
	// const student = cookie ? JSON.parse(cookie) as Student[] : [] as Student[];
	// const index = student.findIndex((student) => student.name === name && student.marks === marks);
	// if (index !== -1) {
	// 	student.splice(index, 1);

	delete_all: async () => {
		await db.delete(student);
	}
} satisfies Actions;
