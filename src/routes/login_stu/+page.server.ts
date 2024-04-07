import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server";
import { login } from "$lib/server/schema";



export const load = (async () => {

}) satisfies PageServerLoad;

export const actions = {
	signIn: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		if (!email || !password) {
			return {
				message: "Email and password are required"
			};
		}

		await db.insert(login).values({
			email,
			password,
			id: ""
		});

	}
} satisfies Actions;
