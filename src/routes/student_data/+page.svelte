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

<main class="bg-slate-300">
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
	<form action="?/add" method="post">
		<p class="text-red-600">{form?.message || ''}</p>
		<h2 class="text-center text-xl font-bold font-serif">STUDENTS LIST</h2>
		<p>{form?.message}</p>
		<div class="inline-block ml-2">
			<Input class="mt-2" type="text" name="id" placeholder="Student Id" />
			<Input class="mt-2" type="text" name="text" placeholder="Student name" />
			<Input class="mt-2" type="number" name="number" placeholder="Marks" />
			<Input class="mt-2 mb-2" type="email" name="email" placeholder="Enter email address" />
			<Button class="bg-slate-700 ml-2" type="submit">Create Student</Button>
			<Button class="bg-slate-700 ml-2" type="submit" formaction="?/search" variant="outline"
				>Search</Button
			>
			<a
				class="bg-slate-700 ml-2 text-white p-3"
				href={sort ? '/student_data' : '/student_data?sort=desc'}>{sort ? 'Reset' : 'Sort'}</a
			>
			<Button class="bg-slate-700 ml-2" type="submit" formaction="?/delete_all">Delete All</Button>
		</div>
	</form>
	<ol>
		<Table.Root>
			<TableCaption>Student Data</TableCaption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Student Id</Table.Head>
					<Table.Head>Student Name</Table.Head>
					<Table.Head>Marks</Table.Head>
					<Table.Head class="text-right">Email Id</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
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
								<Button type="submit">
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
