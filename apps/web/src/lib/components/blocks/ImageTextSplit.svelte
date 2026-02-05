<script lang="ts">
	import type { ImageTextSplitBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { RichText } from '$lib/components/ui/rich-text';
	import { cn } from '$lib/utils.js';

	let { block }: { block: ImageTextSplitBlock } = $props();

	let contentOrder = $derived(block.imagePosition === 'right' ? 'order-2' : 'order-1');
	let imageOrder = $derived(block.imagePosition === 'right' ? 'order-1' : 'order-2');
</script>

<section class="w-full bg-[#1a1a1a] py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 md:px-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<!-- Content -->
			<div class={contentOrder}>
				{#if block.eyebrow}
					<span class="mb-4 block text-sm font-medium uppercase tracking-widest text-[#c9a86c]">
						{block.eyebrow}
					</span>
				{/if}

				{#if block.heading}
					<h2 class="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
						{block.heading}
					</h2>
				{/if}

				{#if block.content}
					<div class="prose prose-lg prose-invert max-w-none">
						<RichText content={block.content} />
					</div>
				{/if}

				{#if block.cta?.label && block.cta?.link}
					<a
						href={block.cta.link}
						class={cn(
							'inline-flex items-center justify-center mt-8 px-8 py-4',
							'bg-[#c9a86c] text-[#1a1a1a] font-semibold',
							'hover:bg-[#b8985c] transition-colors duration-200'
						)}
					>
						{block.cta.label}
					</a>
				{/if}
			</div>

			<!-- Image -->
			<div class={imageOrder}>
				<div class="relative aspect-[4/3] overflow-hidden rounded-xl">
					{#if block.image}
						<Image
							media={block.image}
							class="h-full w-full object-cover"
							alt={block.imageCaption || ''}
						/>
					{/if}
					{#if block.imageCaption}
						<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
							<p class="text-sm text-white">{block.imageCaption}</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
