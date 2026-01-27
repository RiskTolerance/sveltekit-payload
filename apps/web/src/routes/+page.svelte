<script lang="ts">
	let { data } = $props();
	import { HeroBlock, CarouselBlock, RichTextBlock, ImageBlock } from '$lib/components/blocks';
</script>

<p class="mx-auto w-fit text-4xl">BLOCKS</p>
<div class="p-8 md:p-16">
	{#each data.page?.layout as block, i}
		{#if block.blockType === 'hero'}
			<HeroBlock {block} />
		{:else if block.blockType === 'carousel'}
			<CarouselBlock {block} />
		{:else if block.blockType === 'richText'}
			<RichTextBlock {block} />
		{/if}
		{#if block.blockType === 'image'}
			<ImageBlock {block} />
		{/if}
	{/each}
</div>