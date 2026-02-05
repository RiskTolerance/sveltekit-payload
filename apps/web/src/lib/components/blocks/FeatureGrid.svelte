<script lang="ts">
	import type { FeatureGridBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: FeatureGridBlock } = $props();

	let columnsClass = $derived.by(() => {
		switch (block.columns) {
			case '2':
				return 'lg:grid-cols-2';
			case '4':
				return 'sm:grid-cols-2 lg:grid-cols-4';
			case '3':
			default:
				return 'sm:grid-cols-2 lg:grid-cols-3';
		}
	});
</script>

<section class="w-full bg-[#1a1a1a] py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 md:px-12">
		{#if block.eyebrow}
			<span class="mb-4 block text-center text-sm font-medium uppercase tracking-widest text-[#c9a86c]">
				{block.eyebrow}
			</span>
		{/if}

		{#if block.heading}
			<h2 class="mb-4 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
				{block.heading}
			</h2>
		{/if}

		{#if block.description}
			<p class="mx-auto mb-16 max-w-2xl text-center text-gray-300">{block.description}</p>
		{/if}

		<div class={cn('grid gap-8', columnsClass)}>
			{#each block.features ?? [] as feature}
				<div class="group rounded-xl bg-[#2a2a2a] p-8 transition-colors duration-300 hover:bg-[#333333]">
					{#if feature.image}
						<div class="mb-6 aspect-video overflow-hidden rounded-lg">
							<Image
								media={feature.image}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								alt={feature.title}
							/>
						</div>
					{/if}
					
					<h3 class="mb-3 text-xl font-bold text-white">{feature.title}</h3>
					
					{#if feature.description}
						<p class="text-gray-400">{feature.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
