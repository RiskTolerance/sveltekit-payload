<script lang="ts">
	import type { NewsletterBlock } from '$cms';
	import { cn } from '$lib/utils.js';

	let { block }: { block: NewsletterBlock } = $props();

	let email = $state('');
	let isSubmitted = $state(false);
	let isLoading = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		isLoading = true;
		// Simulate submission
		setTimeout(() => {
			isLoading = false;
			isSubmitted = true;
			email = '';
		}, 1000);
	}
</script>

<section class="w-full bg-[#2a2a2a] py-16 md:py-24">
	<div class="mx-auto max-w-2xl px-6 text-center md:px-12">
		{#if block.eyebrow}
			<span class="mb-4 block text-sm font-medium uppercase tracking-widest text-[#c9a86c]">
				{block.eyebrow}
			</span>
		{/if}

		{#if block.heading}
			<h2 class="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
				{block.heading}
			</h2>
		{/if}

		{#if block.description}
			<p class="mb-8 text-gray-300">{block.description}</p>
		{/if}

		{#if isSubmitted}
			<div class="rounded-lg bg-[#1a1a1a] p-8">
				<p class="text-lg font-medium text-[#c9a86c]">{block.successMessage || 'Thank you for subscribing!'}</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="flex flex-col gap-4 sm:flex-row">
				<input
					type="email"
					placeholder={block.placeholder || 'Enter your email'}
					bind:value={email}
					required
					class="flex-1 rounded-lg border-0 bg-[#1a1a1a] px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c9a86c]"
				/>
				<button
					type="submit"
					disabled={isLoading}
					class={cn(
						'whitespace-nowrap rounded-lg bg-[#c9a86c] px-8 py-4 font-semibold text-[#1a1a1a] transition-colors duration-200',
						'hover:bg-[#b8985c] disabled:opacity-50'
					)}
				>
					{isLoading ? 'Subscribing...' : (block.buttonText || 'Subscribe')}
				</button>
			</form>
			
			{#if block.privacyText}
				<p class="mt-4 text-sm text-gray-500">{block.privacyText}</p>
			{/if}
		{/if}
	</div>
</section>
