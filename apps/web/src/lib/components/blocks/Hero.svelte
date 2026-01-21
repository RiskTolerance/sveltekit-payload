<script lang="ts">
	import type { HeroBlock } from '$cms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Image } from '$lib/components/ui/image';

	let { block }: { block: HeroBlock } = $props();
</script>

<div class="flex h-[50vh] w-full flex-col items-center justify-evenly">
	<div class="gap-4">
		<h1>{block.heading}</h1>
		<h2>{block.subheading}</h2>
		{#if block.backgroundImage}
			<Image
				media={block.backgroundImage}
				class="aspect-square h-[300px] overflow-clip object-cover"
			/>
		{/if}
	</div>
	<Button href={block.cta?.link}>{block.cta?.label}</Button>
</div>
