<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<div class="flex justify-center mx-auto">
	<form method="post">
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
							id="username"
							type="username"
							placeholder="m@example.com"
							name="email"
						/>
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input required id="email" type="email" placeholder="m@example.com" name="email" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input required id="password" type="password" name="password" placeholder="Password" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button formaction="?/signIn" type="submit" class="w-full ">Sign in</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</form>
</div>
