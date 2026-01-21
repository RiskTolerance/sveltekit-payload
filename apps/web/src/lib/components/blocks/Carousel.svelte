<script lang="ts">
	import type { CarouselBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';

	let { block }: { block: CarouselBlock } = $props();

	const autoplayPlugin = $derived(
		block.autoplay
			? Autoplay({
					delay: block.autoplayDelay ?? 3000,
					stopOnInteraction: true,
				})
			: null
	);
</script>

<div class="w-full py-8">
	<Carousel.Root
		class="w-full max-w-4xl mx-auto"
		opts={{
			align: 'start',
			loop: true,
		}}
		plugins={autoplayPlugin ? [autoplayPlugin] : []}
		onmouseenter={() => autoplayPlugin?.stop()}
		onmouseleave={() => autoplayPlugin?.reset()}
	>
		<Carousel.Content>
			{#each block.slides ?? [] as slide}
				<Carousel.Item class="basis-full md:basis-1/2 lg:basis-1/3">
					<div class="p-2">
						<div class="relative aspect-video overflow-hidden rounded-lg">
							<Image
								media={slide.image}
								class="h-full w-full object-cover"
								alt={slide.caption ?? ''}
							/>
							{#if slide.caption}
								<div
									class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white"
								>
									<p class="text-sm">{slide.caption}</p>
								</div>
							{/if}
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
