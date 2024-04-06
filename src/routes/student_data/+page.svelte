<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$ui/button/index.js';
	import { Input } from '$ui/input/index.js';
	import * as Table from '$ui/table/index.js';
	import TableCaption from '$ui/table/table-caption.svelte';
	import { goto } from '$app/navigation';
	import Delete from './components/delete.svelte';

	export let data;
	export let form;

	$: sort = $page.url.searchParams.get('sort');
	$: search = $page.url.searchParams.get('search');
</script>

<main class=" mt-4">
	<div class="  rounded-b-none rounded-md mx-4 flex justify-center gap-20 bg-slate-300">
		<div class=" mb-3 ml-10 pt-4">
			<Input
				type="text"
				class="w-500"
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
			<Button class=" ml-2 w-500 bg-slate-500" type="submit" formaction="?/search" variant="ghost"
				>Search</Button
			>
		</div>
		<div class="ml-10 pt-5">
			<a
				class="bg-slate-500 rounded-md py-2 px-3 hover:bg-accent hover:text-accent-foreground"
				href={sort ? '/student_data' : '/student_data?sort=desc'}>{sort ? 'Reset' : 'Sort'}</a
			>
		</div>
	</div>
	<hr class="mx-4" />
	<form action="?/add" method="post">
		<div class="mx-4">
			<p class=" bg-slate-300 text-red-600">{form?.message || ''}</p>
		</div>
		<div class="flex bg-slate-300 mx-4 rounded-t-none rounded-md">
			<div class="ml-2">
				<Input class="mt-2 px-3 py-2 " type="text" name="id" placeholder="Student Id" />
			</div>
			<div class="ml-2">
				<Input class="mt-2 " type="text" name="text" placeholder="Student name" />
			</div>
			<div class="ml-2">
				<Input class="mt-2 " type="number" name="number" placeholder="Marks" />
			</div>
			<div class="ml-2">
				<Input class="mt-2 mb-2 " type="email" name="email" placeholder="Enter email address" />
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
	<ol>
		<Table.Root class=" border-collapse border border-slate-400 mt-5 bg-slate-300  mx-4">
			<TableCaption class="bg-slate-400 text-white mt-0">Student Data</TableCaption>
			<Table.Header class=" bg-slate-400">
				<Table.Row class="border-collapse border border-slate-400">
					<Table.Head class="w-[100px] text-center text-white">Student Id</Table.Head>
					<Table.Head class="text-center text-white">Student Name</Table.Head>
					<Table.Head class=" text-white">Marks</Table.Head>
					<Table.Head class="text-center text-white">Email Id</Table.Head>
					<Table.Head class="text-left text-white">Actions</Table.Head>
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
	</ol>
</main>
