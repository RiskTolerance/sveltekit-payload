<script lang="ts">
	import type { HeroBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: HeroBlock } = $props();

	let hasBackgroundImage = $derived(!!block.backgroundImage);
	let hasSideImage = $derived(!!block.sideImage);
</script>

<section
	class={cn(
		'relative min-h-[80vh] w-full flex items-center overflow-hidden',
		!hasSideImage && 'justify-center text-center',
		hasSideImage && 'bg-[#1a1a1a]'
	)}
>
	<!-- Background Image -->
	{#if block.backgroundImage}
		<div class="absolute inset-0 z-0">
			<Image
				media={block.backgroundImage}
				class="h-full w-full object-cover"
				alt=""
				loading="eager"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-[#1a1a1a]/50"></div>
		</div>
	{/if}

	<div class={cn(
		'relative z-10 w-full px-6 py-20 md:px-12 lg:px-20',
		hasSideImage && 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto',
		!hasSideImage && 'max-w-4xl mx-auto text-center'
	)}>
		<!-- Text Content -->
		<div class={cn(
			'flex flex-col',
			hasSideImage && 'order-2 lg:order-1',
			!hasSideImage && 'items-center'
		)}>
			{#if block.eyebrow}
				<span class="text-[#c9a86c] text-sm md:text-base font-medium tracking-widest uppercase mb-4">
					{block.eyebrow}
				</span>
			{/if}

			{#if block.heading}
				<div class="mb-6">
					<h1 class={cn(
						'font-bold tracking-tight',
						'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
						'text-white uppercase'
					)}>
						{#if block.highlightText && block.heading.includes(block.highlightText)}
							{@const parts = block.heading.split(block.highlightText)}
							{parts[0]}
							<span class="text-[#c9a86c]">{block.highlightText}</span>
							{parts[1] || ''}
						{:else}
							{block.heading}
						{/if}
					</h1>
				</div>
			{/if}

			{#if block.subheading}
				<p
					class={cn(
						'mb-8 text-lg md:text-xl',
						'text-gray-300',
						!hasSideImage && 'max-w-2xl'
					)}
				>
					{block.subheading}
				</p>
			{/if}

			{#if block.cta?.label && block.cta?.link}
				<a
					href={block.cta.link}
					class={cn(
						'inline-flex items-center justify-center px-8 py-4',
						'bg-[#c9a86c] text-[#1a1a1a] font-semibold',
						'hover:bg-[#b8985c] transition-colors duration-200',
						!hasSideImage && 'text-lg'
					)}
				>
					{block.cta.label}
				</a>
			{/if}
		</div>

		<!-- Side Image -->
		{#if block.sideImage}
			<div class="order-1 lg:order-2 relative">
				<div class="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
					<Image
						media={block.sideImage}
						class="h-full w-full object-cover"
						alt={block.sideImageCaption || ''}
					/>
					{#if block.sideImageCaption}
						<div class="absolute bottom-0 left-0 right-0 bg-[#c9a86c] p-4">
							<p class="text-[#1a1a1a] font-bold text-sm uppercase tracking-wide">{block.sideImageCaption}</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>
