<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';
	export let form;

	function handleClick(event: MouseEvent) {
		event.preventDefault();
		goto('/student_data');
	}
</script>

<p>{form?.error || ''}</p>
<div class="flex justify-center">
	<Card.Root class="w-full max-w-sm bg-slate-300  ">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input required id="email" type="email" placeholder="m@example.com" name="email" />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input required id="password" type="password" name="password" />
			</div>
		</Card.Content>
		<Card.Footer>
			<form method="post">
				<Button
					formaction="?/signIn"
					on:click={handleClick}
					type="submit"
					class=" bg-slate-700 w-full ">Sign in</Button
				>
			</form>
		</Card.Footer>
	</Card.Root>
</div>
