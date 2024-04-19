import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server";
import { login } from "$lib/server/schema";
import { eq } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";




export const load = (async () => {

}) satisfies PageServerLoad;

export const actions = {

	signIn: async ({ request, fetch }) => {

		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const username = data.get('username') as string;
		const emailDuplicates = await db.select().from(login).where(eq(login.email, email));
		if (emailDuplicates.length > 0) {
			return {
				message: "Email already exists"
			};
		}



		await fetch("http://localhost:5000/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});




		throw redirect(302, '/student_data');
	}
} satisfies Actions;
