<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import {
		playbackAction,
		playbackInfo,
		playbackSeekRequest,
		songSrc,
		volume
	} from '$lib/stores/playback';
	import VolumeSlider from '$lib/components/NowPlayingBar/VolumeSlider.svelte';
	import NowPlayingInfo from '$lib/components/NowPlayingBar/NowPlayingInfo.svelte';
	import PlayerControls from '$lib/components/NowPlayingBar/PlayerControls.svelte';

	let audioEl: HTMLAudioElement;

	let duration = 0;
	function updateAudio(e: Event & { currentTarget: EventTarget & HTMLAudioElement }) {
		if (!e.target) return;
		if ('duration' in e.target) {
			duration = e.target?.duration as number;
		}
		if ('play' in e.target) {
			const playPromise = e.target.play;
			if (typeof playPromise === 'function') {
				playPromise();
			}
		}
	}

	playbackSeekRequest.subscribe((value) => {
		if (!audioEl) return;
		audioEl.currentTime = value;
	});

	playbackAction.subscribe((value) => {
		if (!audioEl) {
			console.error('Audio element not found');
			return;
		} else {
			console.log('Action:', value);
		}
		// 'play' | 'pause' | 'stop' | 'next' | 'prev' | 'none'
		switch (value.e) {
			case 'play':
				audioEl.play();
				break;
			case 'pause':
				audioEl.pause();
				break;
			case 'stop':
				audioEl.pause();
				audioEl.currentTime = 0;
				break;
			case 'next':
				break;
			case 'prev':
				break;
			case 'none':
				break;
		}
	});
</script>

<audio
	bind:volume={$volume}
	bind:this={audioEl}
	src={$songSrc}
	on:timeupdate={() => {
		playbackInfo.set({
			elapsed: audioEl.currentTime,
			duration: audioEl.duration,
			playing: !audioEl.paused
		});
	}}
	on:canplaythrough={updateAudio}
/>

<AppShell scrollbarGutter="auto">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="headline">
				<h1 class="h1">SAUDIO</h1>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />

	<svelte:fragment slot="footer">
		<div class="flex w-full h-28 gap-4 px-4">
			<NowPlayingInfo />
			<PlayerControls />
			<div class="flex-1 flex flex-col items-end justify-center gap-4">
				<VolumeSlider />
			</div>
		</div>
	</svelte:fragment>
</AppShell>
