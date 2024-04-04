import type { PageServerLoad, Actions } from "./$types";
// import type { Login } from "../student_data/type";
import { redirect } from "@sveltejs/kit";


export const load = (({ url }) => {


	const fromUrl = url.pathname;
	throw redirect(302, `/student_data?redirectTo${fromUrl}`);




}) satisfies PageServerLoad;

export const actions = {
	signIn: async ({ request, url }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		if (!email || !password) {
			return {
				error: "Email and password are required"
			};
		}
		else {
			const fromUrl = url.pathname;
			throw redirect(302, `/student_data?redirectTo${fromUrl}`);
		}

	}
} satisfies Actions;
