<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';

	let isMenuOpen = $state(false);

	const navItems = [
		{ label: 'Our Story', href: '/about-us' },
		{ label: 'Our Difference', href: '/heritage-berkshire-difference' },
		{ label: 'Our Products', href: '/products' },
		{ label: 'Contact', href: '/contact-us' }
	];
</script>

<header class="sticky top-0 z-50 w-full bg-[#1a1a1a] border-b border-white/10">
	<div class="mx-auto max-w-7xl px-6 md:px-12">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3">
				<div class="h-12 w-12 bg-[#c9a86c] rounded-full flex items-center justify-center">
					<svg viewBox="0 0 40 40" class="h-8 w-8 text-[#1a1a1a]" fill="currentColor">
						<path d="M20 5C12 5 8 12 8 18c0 6 4 10 8 12v3c0 1.1.9 2 2 2s2-.9 2-2v-3c4-2 8-6 8-12 0-6-4-13-8-13z" />
					</svg>
				</div>
				<span class="text-xl font-bold text-white hidden sm:block">Heritage Berkshire</span>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden lg:flex items-center gap-8">
				{#each navItems as item}
					<a
						href={item.href}
						class={cn(
							'text-sm font-medium transition-colors hover:text-[#c9a86c]',
							$page.url.pathname === item.href ? 'text-[#c9a86c]' : 'text-gray-300'
						)}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<!-- CTA Button -->
			<div class="hidden lg:block">
				<a
					href="/contact-us"
					class="inline-flex items-center justify-center px-6 py-3 bg-[#c9a86c] text-[#1a1a1a] font-semibold hover:bg-[#b8985c] transition-colors"
				>
					Get In Touch
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="lg:hidden p-2 text-white"
				onclick={() => isMenuOpen = !isMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="lg:hidden border-t border-white/10 bg-[#1a1a1a]">
			<nav class="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4">
				{#each navItems as item}
					<a
						href={item.href}
						class={cn(
							'py-2 text-lg font-medium transition-colors hover:text-[#c9a86c]',
							$page.url.pathname === item.href ? 'text-[#c9a86c]' : 'text-white'
						)}
						onclick={() => isMenuOpen = false}
					>
						{item.label}
					</a>
				{/each}
				<a
					href="/contact-us"
					class="mt-4 inline-flex items-center justify-center px-6 py-3 bg-[#c9a86c] text-[#1a1a1a] font-semibold"
					onclick={() => isMenuOpen = false}
				>
					Get In Touch
				</a>
			</nav>
		</div>
	{/if}
</header>
