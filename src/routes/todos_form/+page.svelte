<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let data;
	onMount(() => {
		console.log('Data: ', data);
	});
</script>

<main>
	<form action="?/add" method="POST">
		<h1>Create New Todo</h1>
		<input type="text" placeholder="What to do?.." name="text" />
		<button type="submit">Create</button>
	</form>

	<h1>Your Todo Tasks</h1>
	<ul>
		{#each data.todo as { text }, index}
			<li>
				<form
					method="POST"
					use:enhance={({ formData, action }) => {
						console.log('Before request: ', formData);
						formData.append('index', index.toString());
						return async function () {
							console.log('Request completed: ');
						};
					}}
				>
					<span>{text}</span>
					<button type="submit" formaction="?/done">Done</button>
					<input type="text" value={text} name="text" />
					<button type="submit" formaction="?/delete">Delete</button>
				</form>
			</li>
		{/each}
	</ul>
</main>
