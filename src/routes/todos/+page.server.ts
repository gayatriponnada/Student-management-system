import type { Actions } from './$types';

export const actions = {
	type: async ({ request, cookies }) => {
		const data = await request.formData();
		const todo = data.get('todos');
		const done = data.get('done');
		cookies.set('todos', `${todo}`, { path: '/' });
		cookies.set('done', `${done}`, { path: '/' });
	},

	addup: async ({ request, cookies }) => {
		const data = await request.formData();
		const placeholder = data.getAll('placeholder');
		const done = data.get('done');
		cookies.set('placeholder', `${placeholder}`, { path: '/' });
		cookies.set('done', `${done}`, { path: '/' });
	}
} satisfies Actions;
