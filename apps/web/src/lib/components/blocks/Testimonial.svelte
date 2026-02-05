<script lang="ts">
	import type { TestimonialBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: TestimonialBlock } = $props();

	let bgClass = $derived.by(() => {
		switch (block.backgroundStyle) {
			case 'dark':
				return 'bg-[#1a1a1a]';
			case 'image':
				return 'bg-[#1a1a1a] relative overflow-hidden';
			case 'gold':
			default:
				return 'bg-[#c9a86c]';
		}
	});
	let isGold = $derived(block.backgroundStyle === 'gold' || !block.backgroundStyle);
</script>

<section class={cn('w-full py-20 md:py-28', bgClass)}>
	{#if block.backgroundImage && block.backgroundStyle === 'image'}
		<div class="absolute inset-0 z-0">
			<Image
				media={block.backgroundImage}
				class="h-full w-full object-cover"
				alt=""
			/>
			<div class="absolute inset-0 bg-[#1a1a1a]/70"></div>
		</div>
	{/if}

	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
		<div class="mb-8">
			<svg
				class={cn('mx-auto h-12 w-12', isGold ? 'text-[#1a1a1a]/30' : 'text-[#c9a86c]/50')}
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
				/>
			</svg>
		</div>

		{#if block.quote}
			<blockquote
				class={cn(
					'mb-8 text-2xl font-medium leading-relaxed md:text-3xl lg:text-4xl',
					isGold ? 'text-[#1a1a1a]' : 'text-white'
				)
			}
			>
				<span>&ldquo;</span>{block.quote}<span>&rdquo;</span>
			</blockquote>
		{/if}

		{#if block.authorImage}
			<div class="mb-4 flex justify-center">
				<div class="h-16 w-16 overflow-hidden rounded-full border-2 border-[#c9a86c]">
					<Image
						media={block.authorImage}
						class="h-full w-full object-cover"
						alt={block.authorName || ''}
					/>
				</div>
			</div>
		{/if}

		{#if block.authorName}
			<p class={cn('text-lg font-semibold', isGold ? 'text-[#1a1a1a]' : 'text-white')}>
				{block.authorName}
			</p>
		{/if}

		{#if block.authorTitle}
			<p class={cn('text-sm', isGold ? 'text-[#1a1a1a]/70' : 'text-gray-400')}>{block.authorTitle}</p>
		{/if}
	</div>
</section>
