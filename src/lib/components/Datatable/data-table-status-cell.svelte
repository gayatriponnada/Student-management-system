<script lang="ts">
	import { statuses } from './(data)/data';

	export let value: string;
	const subjects = statuses.find((subjects) => subjects.value === value);
	// const Icon = status?.icon;
</script>

{#if subjects}
	<div class="flex w-[100px] items-center">
		<!-- {#if Icon}
			<Icon class="mr-2 h-4 w-4 text-muted-foreground" />
		{/if} -->
		<span>{subjects.label}</span>
	</div>
{/if}
