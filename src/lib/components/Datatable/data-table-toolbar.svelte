<script lang="ts">
	import type { TableViewModel } from 'svelte-headless-table';
	import Cross2 from 'svelte-radix/Cross2.svelte';
	import type { Writable } from 'svelte/store';
	import { statuses } from './(data)/data';
	import type { SelectStudent } from '$lib/database/schema.js';
	import { DataTableFacetedFilter, DataTableViewOptions } from './index.js';
	import Button from '$ui/button/button.svelte';
	import { Input } from '$ui/input/index.js';

	export let tableModel: TableViewModel<SelectStudent>;
	export let data: SelectStudent[];

	const counts = data.reduce<{
		subject: { [index: string]: number };
		// priority: { [index: string]: number };
	}>(
		(acc, { subject }) => {
			acc.subject[subject] = (acc.subject[subject] || 0) + 1;
			// acc.priority[priority] = (acc.priority[priority] || 0) + 1;
			return acc;
		},
		{
			subject: {}
			// priority: {}
		}
	);

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			subject: string[];
			// priority: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Search"
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.subject}
			title="Subjects"
			options={statuses}
			counts={counts.subject}
		/>
		<!-----<DataTableFacetedFilter
			bind:filterValues={$filterValues.priority}
			title="Priority"
			options={priorities}
			counts={counts.priority}
		/> -->
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.subject = [];
					// $filterValues.priority = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
