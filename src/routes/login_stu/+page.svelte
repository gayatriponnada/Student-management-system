<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { onMount } from 'svelte';
	export let form;
	$: emailError = form?.message || '';
	onMount(() => {
		setTimeout(() => {
			emailError = '';
		}, 3000);
	});
</script>

<div class="flex justify-center py-8">
	<form method="post" class="flex items-center">
		<div class="mx-auto my-auto">
			<Card.Root class="w-full max-w-sm   ">
				<Card.Header>
					<Card.Title class="text-2xl">Login</Card.Title>
					<Card.Description>Enter your email below to login to your account.</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input required class="username" type="text" placeholder="name" name="username" />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							required
							class="email"
							type="email"
							placeholder="m@example.com"
							name="email"
							on:change={(e) => {
								const email = e.currentTarget.value;
								if (email.length <= 2) {
									emailError = 'Email should be more than 2 characters';
								} else {
									emailError = '';
								}
							}}
						/>
						<p class=" text-sm text-destructive">{emailError}</p>
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input
							required
							class="password"
							type="password"
							name="password"
							placeholder="Password"
						/>
					</div>
				</Card.Content>
				<Card.Footer>
					<Button formaction="?/signIn" type="submit" class="w-full ">Sign in</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</form>
</div>
