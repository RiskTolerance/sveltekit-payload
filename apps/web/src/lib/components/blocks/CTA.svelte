<script lang="ts">
	import type { CTABlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: CTABlock } = $props();

	let hasBackgroundImage = $derived(!!block.backgroundImage);
	let bgColorClass = $derived.by(() => {
		switch (block.backgroundColor) {
			case 'dark':
				return 'bg-[#1a1a1a]';
			case 'burgundy':
				return 'bg-[#7B1F22]';
			case 'gold':
				return 'bg-[#c9a86c]';
			default:
				return 'bg-[#2a2a2a]';
		}
	});
	let isGoldBg = $derived(block.backgroundColor === 'gold');
</script>

<section class={cn('relative w-full py-20 md:py-28', bgColorClass)}>
	<!-- Background Image -->
	{#if block.backgroundImage}
		<div class="absolute inset-0 z-0">
			<Image
				media={block.backgroundImage}
				class="h-full w-full object-cover"
				alt=""
			/>
			<div class="absolute inset-0 bg-[#1a1a1a]/80"></div>
		</div>
	{/if}

	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
		{#if block.eyebrow}
			<span class={cn(
				'text-sm font-medium tracking-widest uppercase mb-4 block',
				isGoldBg ? 'text-[#1a1a1a]/70' : 'text-[#c9a86c]'
			)}>
				{block.eyebrow}
			</span>
		{/if}

		{#if block.heading}
			<div class="mb-6">
				<h2 class={cn(
					'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
					isGoldBg ? 'text-[#1a1a1a]' : 'text-white'
				)}>
					{block.heading}
				</h2>
			</div>
		{/if}

		{#if block.description}
			<p class={cn(
				'mb-10 text-lg md:text-xl',
				isGoldBg ? 'text-[#1a1a1a]/80' : 'text-gray-300'
			)}>
				{block.description}
			</p>
		{/if}

		{#if block.buttons?.length}
			<div class="flex flex-wrap justify-center gap-4">
				{#each block.buttons as button, i}
					<a
						href={button.link}
						class={cn(
							'inline-flex items-center justify-center px-8 py-4 font-semibold transition-colors duration-200',
							button.style === 'primary' && (isGoldBg 
								? 'bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90'
								: 'bg-[#c9a86c] text-[#1a1a1a] hover:bg-[#b8985c]'
							),
							button.style === 'secondary' && (isGoldBg
								? 'bg-white text-[#1a1a1a] hover:bg-gray-100'
								: 'bg-white text-[#1a1a1a] hover:bg-gray-100'
							),
							button.style === 'outline' && (isGoldBg
								? 'border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
								: 'border-2 border-white text-white hover:bg-white hover:text-[#1a1a1a]'
							),
							i === 0 && 'text-lg'
						)}
					>
						{button.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
