<script lang="ts">
	import { statuses } from './(data)/data';

	export let value: string;
	const subject = statuses.find((subject) => subject.value === value);
	// const Icon = status?.icon;
</script>

{#if subject}
	<div class="flex w-[100px] items-center">
		<!-- {#if Icon}
			<Icon class="mr-2 h-4 w-4 text-muted-foreground" />
		{/if} -->
		<span>{subject.label}</span>
	</div>
{/if}
