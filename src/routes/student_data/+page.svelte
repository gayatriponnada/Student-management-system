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

	export let data;

	let name = '';
	let marks = 0;
	let email = '';
	let password = '';
	let nameError = '';
	let marksError = '';
	let emailError = '';

	const studentName = () => {
		if (name.length < 6) {
			nameError = 'Should contain at least 6 characters';
		} else {
			nameError = '';
		}
	};
	const studentMarks = () => {
		if (marks > 0 || marks < 100) {
			marksError = 'Please enter the valid marks';
		} else {
			marksError = '';
		}
	};
	const studentEmail = () => {};

	$: sort = $page.url.searchParams.get('sort');
	$: search = $page.url.searchParams.get('search');
</script>

<main class=" mt-4">
	<form action="?/add" method="post">
		<div class="flex bg-slate-300 mx-4 rounded-md">
			<div class="ml-2">
				<Input
					class="mt-2 px-3 py-2 "
					type="text"
					name="id"
					placeholder="Student Id"
					required
					title="Please fill the student id"
				/>
			</div>
			<div class="ml-2">
				<Input
					class={cn('mt-2', nameError && 'border-red-600')}
					type="text"
					name="text"
					placeholder="Student name"
					required
					title="Please enter the student name"
					on:change={(e) => {
						if (e.currentTarget.value.length < 6) {
							nameError = 'Should contain at least 6 characters';
						} else {
							nameError = '';
						}
					}}
				/>
				<p class="text-red-600">{nameError}</p>
			</div>
			<div class="ml-2">
				<Input
					class="mt-2 "
					type="number"
					name="number"
					placeholder="Marks"
					required
					title="Please enter the  valid marks"
					on:change={studentMarks}
				/>
				<p class="text-red-600">{marksError}</p>
			</div>
			<div class="ml-2">
				<Input
					class="mt-2 mb-2 "
					type="email"
					name="email"
					placeholder="Enter email address"
					required
					title="Please fill the valid email address"
				/>
			</div>
			<div class="ml-2 mt-2">
				<Button class="bg-slate-500 ml-2 w-500" type="submit" variant="ghost">Create Student</Button
				>
			</div>
			<div>
				<Button
					class="bg-slate-500 ml-2 mt-2"
					type="submit"
					formaction="?/delete_all"
					variant="ghost">Delete All</Button
				>
			</div>
		</div>
	</form>
	<div>
		<div class="  rounded-b-none rounded-md mx-4 mt-5 flex justify-center gap-20 bg-slate-300">
			<div class=" mb-3 ml-10 pt-4">
				<Input
					type="text"
					class="w-full"
					placeholder="Search Students By Name"
					value={search}
					on:change={(e) => {
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
			<div class="ml-10 pt-3">
				<Button class=" ml-2 w-500 bg-slate-500" type="submit" variant="ghost">Search</Button>
			</div>
			<div class="ml-10 pt-3">
				<a
					class="bg-slate-500 text-sm font-medium rounded-md py-2.5 px-4 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					href={sort ? '/student_data' : '/student_data?sort=desc'}>{sort ? 'Reset' : 'Sort'}</a
				>
			</div>
		</div>
		<hr class="mx-4" />
		<Table.Root class=" border-collapse border border-slate-400  bg-slate-300  mx-4 ">
			<TableCaption class="bg-slate-400 text-white mt-0">Student Data</TableCaption>
			<Table.Header class=" bg-slate-400">
				<Table.Row class="border-collapse border border-slate-400">
					<Table.Head class="w-[100px] text-center text-white">Student Id</Table.Head>
					<Table.Head class="text-center text-white flex items-center space-x-1">
						<a
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
					<Table.Head class=" text-white">
						<a href={sort?.includes('marks') ? '/student_data' : '/student_data?sort=desc:marks'}>
							<span>Student Marks</span>
							<ChevronsUpDown />
						</a>
					</Table.Head>
					<Table.Head class="text-center text-white">Email Id</Table.Head>
					<Table.Head class="text-left text-white ">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.students as { id, name, marks, email }}
					<Table.Row>
						<Table.Cell class="font-medium">{id}</Table.Cell>
						<Table.Cell class="text-center">{name}</Table.Cell>
						<Table.Cell>{marks}</Table.Cell>
						<Table.Cell class="text-center">{email}</Table.Cell>
						<Table.Cell class="">
							<form action="?/delete" method="POST">
								<Button variant="ghost" type="submit">
									<Delete />
								</Button>
								<input type="text" name="id" value={id} hidden />
							</form>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</main>
