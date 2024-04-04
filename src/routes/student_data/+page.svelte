<script lang="ts">
	import { Button } from '$ui/button/index.js';
	import { Input } from '$ui/input/index.js';
	import * as Table from '$ui/table/index.js';
	import TableCaption from '$ui/table/table-caption.svelte';

	export let data;
	export let form;
</script>

<main class="bg-slate-300">
	<form action="?/add" method="post">
		<p class="text-red-600">{form?.message || ''}</p>
		<h2 class="text-center text-xl font-bold font-serif">STUDENTS LIST</h2>
		<p>{form?.found}</p>
		<div class="inline-block ml-2">
			<Input class="mt-2" type="text" name="id" placeholder="Student Id" />
			<Input class="mt-2" type="text" name="text" placeholder="Student name" />
			<Input class="mt-2" type="number" name="number" placeholder="Marks" />
			<Input class="mt-2 mb-2" type="email" name="email" placeholder="Enter email address" />
			<Button class="bg-slate-700 ml-2" type="submit">Create Student</Button>
			<Button class="bg-slate-700 ml-2" type="submit" formaction="?/search">Search</Button>
			<Button class="bg-slate-700 ml-2" type="submit">Sort</Button>
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
				</Table.Row>
			</Table.Header>
			{#each data.students as { id, name, marks, email }}
				<li>
					<form method="post">
						<div>
							<Table.Body>
								<Table.Row>
									<Table.Cell class="font-medium">{id}</Table.Cell>
									<Table.Cell class="text-center">{name}</Table.Cell>
									<Table.Cell>{marks}</Table.Cell>
									<Table.Cell class="text-right ">{email}</Table.Cell>
								</Table.Row>
							</Table.Body>
							<!-- <Button " bg-slate-700 ml-10" type="submit" formaction="?/delete">Delete</Button> -->
							<!-- <span class="font-light ml-2">Id:{id}</span>
						<span class="font-light ml-2">Name:{name}</span>
						<span class="font-light ml-2">Marks:{marks}</span>
						<span class="font-light ml-2">Email:{email}</span> -->
						</div>
					</form>
				</li>
			{/each}
		</Table.Root>
	</ol>
</main>
