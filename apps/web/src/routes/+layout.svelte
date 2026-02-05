<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Navigation as NavigationType } from '$cms';

	interface LayoutData {
		headerNav: NavigationType | null;
		footerNav: NavigationType | null;
	}

	let { children, data } = $props<{
		children: any;
		data: LayoutData;
	}>();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-[#1a1a1a]">
	<Navigation navData={data.headerNav} />
	
	<main class="flex-1">
		{@render children()}
	</main>
	
	<Footer navData={data.footerNav} />
</div>
