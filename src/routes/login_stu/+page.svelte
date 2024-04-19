<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	export let form;
	let nameError = '';
	let passwordError = '';

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
						<Input
							required
							type="text"
							placeholder="name"
							name="username"
							class={cn(nameError && ' text-destructive border-destructive')}
							title="Please enter the student name"
							on:change={(e) => {
								const nameRegex = /^[A-Za-z]+$/;
								if (e.currentTarget.value.length < 6 || !nameRegex.test(e.currentTarget.value)) {
									nameError = 'Should contain at least 6 characters and enter the valid name';
								} else {
									nameError = '';
								}
							}}
						/>
						<p class=" text-sm text-destructive">{nameError}</p>
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							required
							class="email"
							type="email"
							placeholder="m@example.com"
							title="Please enter the email"
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
							type="password"
							name="password"
							placeholder="Password"
							class={cn(passwordError && ' text-destructive border-destructive')}
							title="Please enter the password"
							on:change={(e) => {
								const passwordRegex =
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
								if (!passwordRegex.test(e.currentTarget.value)) {
									passwordError = 'Enter the valid password with at least 8 characters';
								} else {
									passwordError = '';
								}
							}}
						/>
						<p class=" text-sm text-destructive">{passwordError}</p>
					</div>
				</Card.Content>
				<Card.Footer>
					<Button formaction="?/signIn" type="submit" class="w-full ">Sign in</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</form>
</div>
