<script lang="ts">
	import type { ImageGalleryBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: ImageGalleryBlock } = $props();

	let columnsClass = $derived.by(() => {
		switch (block.columns) {
			case '2':
				return 'grid-cols-1 md:grid-cols-2';
			case '4':
				return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
			case '3':
			default:
				return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
		}
	});
</script>

<section class="w-full bg-[#1a1a1a] py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-6 md:px-12">
		<div class={cn('grid gap-6', columnsClass)}>
			{#each block.images ?? [] as item}
				<div class="group relative aspect-square overflow-hidden rounded-lg bg-[#2a2a2a]">
					<Image
						media={item.image}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						alt={item.caption || ''}
					/>
					{#if item.caption}
						<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<p class="text-sm font-medium text-white">{item.caption}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
