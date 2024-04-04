import type { PageServerLoad, Actions } from './$types';
import type { Todo } from './type';

export const load = (({ cookies }) => {
	const cookie = cookies.get('todo');
	const todo = cookie ? JSON.parse(JSON.parse(JSON.stringify(cookie))) as Todo[] : [] as Todo[];
	console.log("Load function ran...");
	return {
		todo
	};
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, cookies }) => {
		console.log("Add Action Function ran .....");
		const data = await request.formData();
		const text = data.get('text') as string;
		const cookie = cookies.get('todo');
		const todo = cookie ? JSON.parse(cookie) as Todo[] : [] as Todo[];
		todo.push({ text, done: true });
		cookies.set('todo', JSON.stringify(todo), { path: '/' });
	},
	done: async ({ request, cookies }) => {
		const data = await request.formData();
		const index = parseInt(data.get('index') as string);
		const cookie = cookies.get('todo');
		const todo = cookie ? JSON.parse(cookie) as Todo[] : [] as Todo[];
		todo[index].done = !todo[index].done;
		cookies.set('todo', JSON.stringify(todo), { path: '/' });
	},
	delete: async ({ request, cookies }) => {
		const data = await request.formData();
		const index = parseInt(data.get('index') as string);
		const cookie = cookies.get('todo');
		const todo = cookie ? JSON.parse(cookie) as Todo[] : [] as Todo[];
		todo.splice(index, 1);
		cookies.set('todo', JSON.stringify(todo), { path: '/' });
	}
} satisfies Actions;