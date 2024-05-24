<script lang="ts">
	import DataTable from '$lib/components/Datatable/data-table.svelte';
	import DataForm from '$lib/components/Datatable/data-form.svelte';
	import * as Select from '$lib/components/ui/select';
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
	let emailError = form?.message || '';
	let rollNumberError = form?.msg || '';

	// $: sort = $page.url.searchParams.get('sort');
	// $: search = $page.url.searchParams.get('search');

	onMount(() => {
		setTimeout(() => {
			emailError = '';
			rollNumberError = '';
		}, 3000);
	});
</script>

<svelte:head>
	<title>Student Data Management</title></svelte:head
>

<main class=" mt-5 flex flex-col gap-10 w-[90]">
	<h2 class="text-center font-bold font-mono text-2xl">Student Mangement System</h2>
	<div>
		<DataForm form={data.form} />
	</div>
	<div class="container mx-auto py-10 w-4/5">
		<DataTable data={data.students} />
	</div>
</main>
