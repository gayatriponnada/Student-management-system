<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$ui/button/index.js';
	import { Input } from '$ui/input/index.js';
	import * as Table from '$ui/table/index.js';
	import TableCaption from '$ui/table/table-caption.svelte';
	import { goto } from '$app/navigation';
	import Delete from './components/delete.svelte';
	import ChevronsUpDown from './components/chevrons-up-down.svelte';
	import ChevronsDownUp from './components/chevrons-down-up.svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	export let data;
	export let form;

	let nameError = '';
	let marksError = '';
	const nameRegex = /^[A-Za-z]+$/;

	$: emailError = form?.message || '';
	$: sort = $page.url.searchParams.get('sort');
	$: search = $page.url.searchParams.get('search');

	onMount(() => {
		setTimeout(() => {
			emailError = '';
		}, 3000);
	});
</script>

<main class=" mt-5 flex flex-col gap-10 w-[90]">
	<form action="?/add" method="post">
		<div class=" mx-auto bg-secondary flex items-center rounded-md h-20 w-4/5">
			<div class="grid grid-cols-6 gap-2 px-5">
				<Input
					type="text"
					name="rollNumber"
					placeholder="Student RollNumber"
					required
					title="Please fill the student id"
				/>

				<div>
					<Input
						class={cn(nameError && ' text-destructive border-destructive')}
						type="text"
						name="text"
						placeholder="Student name"
						required
						title="Please enter the student name"
						on:change={(e) => {
							if (e.currentTarget.value.length < 6 || !nameRegex.test(e.currentTarget.value)) {
								nameError = 'Should contain at least 6 characters and enter the valid name';
							} else {
								nameError = '';
							}
						}}
					/>
					<p class=" text-sm text-destructive">{nameError}</p>
				</div>

				<div>
					<Input
						class={cn(marksError && 'text-destructive border-destructive')}
						type="number"
						name="number"
						placeholder="Marks"
						required
						title="Please enter the  valid marks"
						on:change={(e) => {
							if (Number(e.currentTarget.value) < 0 || Number(e.currentTarget.value) > 100) {
								marksError = 'Please enter the valid marks';
							} else {
								marksError = '';
							}
						}}
					/>
					<p class="text-sm text-destructive">{marksError}</p>
				</div>

				<div>
					<Input
						type="email"
						name="email"
						placeholder="Enter email address"
						required
						title="Please fill the valid email address"
						on:change={(e) => {
							const email = e.currentTarget.value;
							if (email.length <= 2) {
								emailError = 'Please enter the valid email ID';
							} else {
								emailError = '';
							}
						}}
					/>
					<p class=" text-sm text-destructive">{emailError}</p>
				</div>

				<Button class="bg-primary text-accent " type="submit" variant="ghost">Create Student</Button
				>

				<Button
					class=" flex  bg-primary text-accent"
					type="submit"
					formaction="?/delete_all"
					variant="ghost">Delete All</Button
				>
			</div>
		</div>
	</form>

	<div
		class=" w-4/5 h-16 mx-auto flex justify-center items-center rounded-md rounded-b-none bg-secondary"
	>
		<Input
			class="w-1/2"
			type="text"
			placeholder="Search Students By Name"
			value={search}
			on:input={(e) => {
				const value = e.currentTarget.value;
				const url = new URL(window.location.href);
				if (value.length > 0) {
					url.searchParams.set('search', value);
				} else {
					url.searchParams.delete('search');
				}
				goto(url.toString(), { replaceState: true });
			}}
		/>
	</div>

	<Table.Root class="  bg-secondary  mx-auto w-4/5 ">
		<TableCaption class="bg-primary text-accent mt-0">Student Data</TableCaption>
		<Table.Header class="bg-primary">
			<Table.Row>
				<Table.Head class="w-[100px] text-center text-accent">Student RollNumber</Table.Head>
				<Table.Head class="text-center text-accent flex items-center space-x-1">
					<a
						class="flex items-center"
						href={sort == 'desc:name'
							? '/student_data?sort=asc:name'
							: '/student_data?sort=desc:name'}
					>
						<span>Student Name</span>
						{#if sort == 'desc:name'}
							<ChevronsDownUp />
						{:else}
							<ChevronsUpDown />
						{/if}
					</a>
				</Table.Head>
				<Table.Head class="text-left text-accent">
					<a
						class="flex items-center"
						href={sort?.includes('marks') ? '/student_data' : '/student_data?sort=desc:marks'}
					>
						<span>Student Marks</span>
						<ChevronsUpDown />
					</a>
				</Table.Head>
				<Table.Head class="text-center text-accent"
					><a
						class="flex justify-center items-center"
						href={sort == 'desc:email'
							? '/student_data?sort=asc:email'
							: '/student_data?sort=desc:email'}
						><span>Email Id</span>
						{#if sort == 'desc:email'}
							<ChevronsDownUp />
						{:else}
							<ChevronsUpDown />
						{/if}
					</a>
				</Table.Head>

				<Table.Head class="text-left text-accent ">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.students as { rollNumber, name, marks, email }}
				<Table.Row>
					<Table.Cell class="font-medium">{rollNumber}</Table.Cell>
					<Table.Cell>{name}</Table.Cell>
					<Table.Cell>{marks}</Table.Cell>
					<Table.Cell class="text-center">{email}</Table.Cell>
					<Table.Cell class="">
						<form action="?/delete" method="POST">
							<Button variant="ghost" type="submit">
								<Delete />
							</Button>
							<input type="text" name="rollNumber" value={rollNumber} hidden />
						</form>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</main>
