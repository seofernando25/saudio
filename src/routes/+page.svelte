<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col h-full gap-4 p-2">
	<!-- Results -->

	<div class="flex flex-wrap gap-4 justify-center">
		{#each data.tags as result}
			<a
				href="/tags/{result.name}"
				class="card variant-filled-surface card-hover flex-1 min-w-[8rem] min-h-[8rem] grid place-content-center break-all"
			>
				<span class="" data-toc-ignore="">{result.name}</span>
			</a>
		{/each}
	</div>
</div>
