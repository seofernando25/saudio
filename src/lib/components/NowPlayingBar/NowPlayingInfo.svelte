<script lang="ts">
	import { nowPlaying } from '$lib/stores/playback';
</script>

<div class="flex gap-4 flex-1 items-center">
	<div class="w-16 h-16 grid place-items-center aspect-square">
		<img
			src={$nowPlaying?.art}
			alt={$nowPlaying?.album}
			class="text-center w-16 h-16 rounded-sm bg-surface-400 aspect-square"
		/>
	</div>
	{#if $nowPlaying}
		<div class="flex flex-col justify-center">
			<span class="font-semibold line-clamp-1">{$nowPlaying?.name}</span>
			<span class="font-light">by {$nowPlaying.artist}</span>
		</div>
	{/if}
</div>
