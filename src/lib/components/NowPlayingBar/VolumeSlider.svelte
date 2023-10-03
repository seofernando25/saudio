<script lang="ts">
	import { volume } from '$lib/stores/playback';

	let muteMemory = 0;
	function toggleMute() {
		if ($volume === 0) {
			volume.set(muteMemory);
		} else {
			muteMemory = $volume;
			volume.set(0);
		}
	}
</script>

<div class="flex gap-2">
	<button class="btn-icon" on:click={toggleMute}>
		{#if $volume == 0}
			<i class="fas fa-volume-mute" />
		{:else if $volume < 0.5}
			<i class="fas fa-volume-down" />
		{:else}
			<i class="fas fa-volume-high" />
		{/if}
	</button>
	<input bind:value={$volume} type="range" min="0" max={1} step="0.01" />
</div>
