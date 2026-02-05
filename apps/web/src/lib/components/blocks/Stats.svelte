<script lang="ts">
	import type { StatsBlock } from '$cms';
	import { cn } from '$lib/utils.js';

	let { block }: { block: StatsBlock } = $props();

	let columnsClass = $derived.by(() => {
		switch (block.columns) {
			case '2':
				return 'sm:grid-cols-2';
			case '4':
				return 'grid-cols-2 lg:grid-cols-4';
			case '3':
			default:
				return 'grid-cols-2 lg:grid-cols-3';
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
			<h2 class="mb-16 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
				{block.heading}
			</h2>
		{/if}

		<div class={cn('grid gap-8', columnsClass)}>
			{#each block.stats ?? [] as stat}
				<div class="text-center">
					<p class="mb-2 text-5xl font-bold text-[#c9a86c] md:text-6xl">{stat.value}</p>
					{#if stat.label}
						<p class="text-lg font-medium text-white">{stat.label}</p>
					{/if}
					{#if stat.description}
						<p class="mt-2 text-sm text-gray-400">{stat.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
