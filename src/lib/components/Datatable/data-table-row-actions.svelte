<script lang="ts">
	import DotsHorizontal from 'svelte-radix/DotsHorizontal.svelte';
	// import Delete from './routes/student_data/components/delete.svelte';
	// import { labels } from "../(data)/data.js";
	import { type SelectStudent } from '$lib/database/schema';
	import { Button } from '$ui/button/index.js';
	import * as DropdownMenu from '$ui/dropdown-menu/index.js';

	export let row: SelectStudent;
	const task = row;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<DotsHorizontal class="h-4 w-4" />
			<span class="sr-only">Open Menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
		<!-- <DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item>Make a copy</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator /> -->
		<!-- <DropdownMenu.Sub> -->
		<!-- <DropdownMenu.SubTrigger>Labels</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.RadioGroup value={task.label}>
					{#each labels as label}
						<DropdownMenu.RadioItem value={label.value}>
							{label.label}
						</DropdownMenu.RadioItem>
					{/each}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Separator /> -->
		<form action="?/delete" method="POST">
			<Button variant="ghost" type="submit">
				<DropdownMenu.Item>Delete</DropdownMenu.Item>
			</Button>
			<input type="text" name="rollNumber" value={row.rollNumber} hidden />
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
