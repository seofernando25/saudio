<script lang="ts">
	import {
		nowPlaying,
		playbackAction,
		playbackInfo,
		playbackSeekRequest
	} from '$lib/stores/playback';
	import { onDestroy, onMount } from 'svelte';

	function formatString(duration: number) {
		if (isNaN(duration)) return '00:00';
		if (duration === Infinity) return '∞';

		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor((duration % 3600) / 60);
		const seconds = Math.floor(duration % 60);
		const hoursStr = hours > 0 ? `${hours}:` : '';
		const minutesStr = `${minutes < 10 ? '0' : ''}${minutes}:`;
		const secondsStr = `${seconds < 10 ? '0' : ''}${seconds}`;
		return `${hoursStr}${minutesStr}${secondsStr}`;
	}

	let dragging = false;
	let sliderValue = 0;

	let sliderSub = playbackInfo.subscribe((value) => {
		if (dragging) return;
		if (value.playing) {
			sliderValue = value.elapsed;
		}
	});

	let sliderResetSub = nowPlaying.subscribe((value) => {
		sliderValue = 0;
	});

	onMount(() => {
		sliderValue = $playbackInfo.elapsed;
	});

	onDestroy(() => {
		sliderSub();
		sliderResetSub();
	});

	function dragStart() {
		dragging = true;
	}

	function dragEnd() {
		dragging = false;
		playbackSeekRequest.set(sliderValue);
	}

	function togglePlayback() {
		if ($playbackInfo.playing) {
			playbackAction.set({ e: 'pause' });
		} else {
			playbackAction.set({ e: 'play' });
		}
	}

	$: elapsedFormatted = formatString($playbackInfo.elapsed ?? 0);
	$: durationFormatted = formatString($playbackInfo.duration ?? 0);
</script>

<div class=" m-auto h-min flex flex-col flex-1 items-center justify-center gap-0 sm:gap-4">
	<div class="flex gap-4">
		<button class="btn-icon variant-ghost-primary">
			<i class="fas fa-step-backward" />
		</button>
		<button class="btn-icon variant-filled" on:click={togglePlayback}>
			<!-- audioEl.paused -->
			{#if $playbackInfo.playing}
				<i class="fas fa-pause" />
			{:else}
				<i class="fas fa-play" />
			{/if}
		</button>
		<button class="btn-icon variant-ghost-primary">
			<i class="fas fa-step-forward" />
		</button>
	</div>
	<!-- Playback track -->
	<div class="flex gap-4 w-full">
		<span class="font-mono">{elapsedFormatted}</span>
		<input
			bind:value={sliderValue}
			type="range"
			min="0"
			max={$playbackInfo.duration}
			step="0.1"
			on:input={dragStart}
			on:change={dragEnd}
		/>
		<span class="font-mono">{durationFormatted}</span>
	</div>
</div>

<style>
	[type='range']::-webkit-slider-thumb {
		opacity: 0;
	}

	[type='range']:hover::-webkit-slider-thumb {
		opacity: 1;
	}

	[type='range'] {
		accent-color: var(--color-primary-100);
	}
</style>
