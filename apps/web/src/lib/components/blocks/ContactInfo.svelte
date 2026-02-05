<script lang="ts">
	import type { ContactInfoBlock } from '$cms';
	import { cn } from '$lib/utils.js';

	let { block }: { block: ContactInfoBlock } = $props();
</script>

<section class="w-full bg-[#2a2a2a] py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6 md:px-12">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<!-- Contact Info -->
			<div>
				{#if block.eyebrow}
					<span class="mb-4 block text-sm font-medium uppercase tracking-widest text-[#c9a86c]">
						{block.eyebrow}
					</span>
				{/if}

				{#if block.heading}
					<h2 class="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
						{block.heading}
					</h2>
				{/if}

				<div class="space-y-6">
					{#if block.address}
						<div class="flex items-start gap-4">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a86c]">
								<svg class="h-5 w-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-white">Address</h3>
								<p class="text-gray-300">{block.address}</p>
							</div>
						</div>
					{/if}

					{#if block.phone}
						<div class="flex items-start gap-4">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a86c]">
								<svg class="h-5 w-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-white">Phone</h3>
								<a href="tel:{block.phone}" class="text-gray-300 hover:text-[#c9a86c]">{block.phone}</a>
							</div>
						</div>
					{/if}

					{#if block.email}
						<div class="flex items-start gap-4">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a86c]">
								<svg class="h-5 w-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-white">Email</h3>
<a href="mailto:{block.email}" class="text-gray-300 hover:text-[#c9a86c]">{block.email}</a>
							</div>
						</div>
					{/if}

					{#if block.hours}
						<div class="flex items-start gap-4">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a86c]">
								<svg class="h-5 w-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-white">Hours</h3>
								<p class="text-gray-300 whitespace-pre-line">{block.hours}</p>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Map or Additional Content -->
			{#if block.mapEmbed}
				<div class="h-[400px] overflow-hidden rounded-xl bg-[#1a1a1a]">
					<iframe
						src={block.mapEmbed}
						width="100%"
						height="100%"
						style="border:0;"
						allowfullscreen={true}
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="Location Map"
					></iframe>
				</div>
			{:else if block.additionalContent}
				<div class="rounded-xl bg-[#1a1a1a] p-8">
					<p class="text-gray-300">{block.additionalContent}</p>
				</div>
			{/if}
		</div>
	</div>
</section>
