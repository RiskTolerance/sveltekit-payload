<script lang="ts">
	let { data } = $props();
	import { Hero, Carousel } from '$lib/components/blocks';
</script>

<p class="mx-auto w-fit text-4xl">BLOCKS</p>
<div class="p-8 md:p-16">
	{#each data.page?.layout as block, i}
		{#if block.blockType === 'hero'}
			<Hero {block} />
		{:else if block.blockType === 'carousel'}
			<Carousel {block} />
		{/if}
	{/each}
</div>
