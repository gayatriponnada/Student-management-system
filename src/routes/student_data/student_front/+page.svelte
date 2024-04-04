<script lang="ts">
	import type { Student } from '../type';
	import { onMount } from 'svelte';
	onMount(() => {
		console.log('Data: ', student);
	});

	let student: Student[] = [];
	let id = '';
	let name = '';
	let email = '';
	let marks = 0;
	let searchInput = '';

	function addStudent(event: Event) {
		event.preventDefault();
		const nameRegex = /^[A-Za-z]+$/;

		if (!name.trim() || !email.trim()) {
			{
				alert('Please fill all the fields');
			}
		} else if (marks < 0 || marks > 100) {
			alert('Please enter a mark between 0 and 100');
		} else if (!nameRegex.test(name)) {
			alert('Please enter a valid name');
		} else {
			student.push({ id, name, marks, email });
			student = student;
			id = '';
			name = '';
			email = '';
			marks = 0;
		}
	}
	function sort() {
		student.sort((a, b) => a.name.localeCompare(b.name));
		student = student;
	}
	function search() {
		/*icludes()*/
		// let results = student.filter((s) => s.name.includes(searchInput));
		// console.log(results);

		let name = searchInput;
		let searched = student.find((student) => student.name === name);
		if (searched) {
			console.log(searched);
		} else {
			console.log('Not found');
		}
	}
	function deleteStudent() {
		let name = '';
		let marks = 0;
		let email = '';

		let index = student.findIndex(
			(student) => student.name === name && student.marks === marks && student.email === email
		);
		if (index! - 1) {
			student.splice(index, 1);
			student = student;
		}
	}
</script>

<div>
	{#each student as students}
		<div>
			<span>Name: {students.name}</span>
			<span>Marks: {students.marks}</span>
			<span>Email: {students.email}</span>
			<button on:click={deleteStudent}>Delete</button>
		</div>
	{/each}
	<div>
		<input class=" text-red-300" type="text" bind:value={name} name="text" />
		<input type="number" bind:value={marks} name="number" />
		<input type="email" bind:value={email} name="email" />
		<button on:click|preventDefault={addStudent}>Enter</button>
		<button on:click|preventDefault={sort}>Sort</button>
		<button on:click|preventDefault={search}>Search</button>

		<input type="text" bind:value={searchInput} />
	</div>
</div>
