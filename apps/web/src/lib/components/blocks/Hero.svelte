<script lang="ts">
	import type { HeroBlock } from '$cms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: HeroBlock } = $props();

	let hasBackgroundImage = $derived(!!block.backgroundImage);
</script>

<section
	class={cn(
		'relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 md:min-h-[70vh] md:py-24',
		hasBackgroundImage && 'text-white'
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
			<!-- Gradient overlay for text readability -->
			<div class="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/40"></div>
		</div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-4xl text-center">
		{#if block.heading}
			<h1
				class={cn(
					'mb-4 text-4xl font-bold tracking-tight md:mb-6 md:text-5xl lg:text-6xl',
					hasBackgroundImage ? 'text-white' : 'text-foreground'
				)}
			>
				{block.heading}
			</h1>
		{/if}

		{#if block.subheading}
			<p
				class={cn(
					'mb-8 text-lg md:mb-10 md:text-xl lg:text-2xl',
					hasBackgroundImage ? 'text-white/90' : 'text-muted-foreground'
				)}
			>
				{block.subheading}
			</p>
		{/if}

		{#if block.cta?.label && block.cta?.link}
			<Button
				href={block.cta.link}
				size="lg"
				class={cn(
					'px-8 py-6 text-lg font-semibold transition-all duration-200 hover:scale-105',
					hasBackgroundImage && 'bg-white text-foreground hover:bg-white/90'
				)}
			>
				{block.cta.label}
			</Button>
		{/if}
	</div>
</section>
