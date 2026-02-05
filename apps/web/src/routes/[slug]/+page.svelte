<script lang="ts">
	import type { PageData } from './$types';
	import PageBlocks from '$lib/components/PageBlocks.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page?.title || 'Heritage Berkshire'}</title>
	<meta name="description" content={data.page?.excerpt || 'Premium Heritage Berkshire Pork'} />
</svelte:head>

{#if data.page}
	<PageBlocks blocks={data.page.layout} />
{/if}
