<script lang="ts">
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import {
		playbackAction,
		playbackInfo,
		playbackSeekRequest,
		songSrc,
		togglePlayback,
		volume
	} from '$lib/stores/playback';
	import VolumeSlider from '$lib/components/NowPlayingBar/VolumeSlider.svelte';
	import NowPlayingInfo from '$lib/components/NowPlayingBar/NowPlayingInfo.svelte';
	import PlayerControls from '$lib/components/NowPlayingBar/PlayerControls.svelte';

	import { pwaInfo } from 'virtual:pwa-info';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	let currentTile: number = 0;
	let audioEl: HTMLAudioElement;
	let playFunc = () => {};
	export let data: LayoutData;

	onMount(() => {
		playFunc = audioEl.play.bind(audioEl);
		playbackSeekRequest.set($playbackInfo.elapsed);
	});

	function updateAudio(e: Event & { currentTarget: EventTarget & HTMLAudioElement }) {
		// alert('play');
		if (!e.target) return;
		if ('play' in e.target) {
			const playPromise = e.target.play;

			if (typeof playPromise === 'function') {
				playFunc();
				$playbackInfo.playing = true;
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
				$playbackInfo.playing = true;
				break;
			case 'pause':
				audioEl.pause();
				$playbackInfo.playing = false;
				break;
			case 'stop':
				audioEl.pause();
				$playbackInfo.playing = false;
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

	// Call audioload after $songSrc
	$: if ($songSrc && browser) {
		audioEl?.load();
	}

	if (browser) {
		// Hook to the spacebar to play/pause
		// window.addEventListener('keydown', (e) => {
		// 	if (e.code === 'Space') {
		// 		togglePlayback();
		// 	}
		// });
		// alert('browser');
	}
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

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
	<svelte:fragment slot="sidebarLeft">
		<AppRail class="hidden sm:block">
			<AppRailAnchor
				bind:group={currentTile}
				name="home"
				value={0}
				href="/"
				selected={$page.url.pathname === '/'}
			>
				<svelte:fragment slot="lead">
					<i class="fas fa-home" />
				</svelte:fragment>
				<span>Home</span>
			</AppRailAnchor>

			<!-- selected={$page.url.pathname. '/results'} -->
			<AppRailAnchor
				bind:group={currentTile}
				name="search"
				value={1}
				href="/results/"
				selected={$page.url.pathname.includes('/results')}
			>
				<svelte:fragment slot="lead">
					<i class="fas fa-search" />
				</svelte:fragment>
				<span>Search</span>
			</AppRailAnchor>
		</AppRail>
	</svelte:fragment>

	<slot />

	<!-- --- -->
	<!-- <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 1</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 2</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 3</span>
	</AppRailTile> -->
	<!-- --- -->
	<!-- <svelte:fragment slot="trail">
		<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
	</svelte:fragment> -->

	<svelte:fragment slot="footer">
		<div class="flex w-full px-4 gap-2 sm:gap-4 p-2">
			<div class="hidden sm:flex flex-1">
				<NowPlayingInfo />
			</div>
			<PlayerControls />
			<div class="hidden sm:flex flex-1 flex-col items-end justify-center gap-4">
				<VolumeSlider />
			</div>
		</div>

		<TabGroup
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none"
			rounded=""
			border=""
			class="pb-4 visible sm:hidden "
		>
			<TabAnchor href="/" selected={$page.url.pathname === '/'}>
				<svelte:fragment slot="lead">
					<i class="fas fa-home" />
				</svelte:fragment>
				<span>Home</span>
			</TabAnchor>
			<TabAnchor href="/results" selected={$page.url.pathname.includes('/results')}>
				<svelte:fragment slot="lead">
					<i class="fas fa-search" />
				</svelte:fragment>
				<span>Search</span>
			</TabAnchor>
			<!-- ... -->
		</TabGroup>
	</svelte:fragment>
</AppShell>
