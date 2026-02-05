<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { transformNavigation, isExternalUrl, getIconPath, type NavItem } from '$lib/navigation';
	import type { Navigation as NavigationType } from '$cms';

	interface Props {
		navData?: NavigationType | null;
	}

	let { navData }: Props = $props();

	// Transform CMS footer navigation
	let footerItems = $derived(transformNavigation(navData ?? null));
	let hasFooterNav = $derived(footerItems.length > 0);

	// Group footer items into columns if we have CMS data
	function groupFooterItems(items: NavItem[]): NavItem[][] {
		if (items.length === 0) return [];
		
		// Split items into columns (max 4 columns, min 2 items per column)
		const numColumns = Math.min(4, Math.ceil(items.length / 2));
		const itemsPerColumn = Math.ceil(items.length / numColumns);
		
		const columns: NavItem[][] = [];
		for (let i = 0; i < numColumns; i++) {
			columns.push(items.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
		}
		return columns;
	}

	let footerColumns = $derived(groupFooterItems(footerItems));

	// Social links (these could also come from CMS in future)
	const socialLinks = [
		{ 
			label: 'Facebook', 
			href: 'https://facebook.com', 
			icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
		},
		{ 
			label: 'Instagram', 
			href: 'https://instagram.com', 
			icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
		},
		{ 
			label: 'YouTube', 
			href: 'https://youtube.com', 
			icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
		}
	];
</script>

<footer class="w-full bg-[#0f0f0f] border-t border-white/10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
		<div class="grid grid-cols-1 gap-12" class:lg:grid-cols-12={hasFooterNav}>
			<!-- Brand Column -->
			<div class={hasFooterNav ? 'lg:col-span-4 xl:col-span-5' : ''}>
				<a href="/" class="flex items-center gap-3 mb-6 group">
					<div class="h-12 w-12 bg-[#c9a86c] rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
						<svg viewBox="0 0 40 40" class="h-8 w-8 text-[#1a1a1a]" fill="currentColor" aria-hidden="true">
							<path d="M20 5C12 5 8 12 8 18c0 6 4 10 8 12v3c0 1.1.9 2 2 2s2-.9 2-2v-3c4-2 8-6 8-12 0-6-4-13-8-13z" />
						</svg>
					</div>
					<span class="text-xl font-bold text-white">Heritage Berkshire</span>
				</a>
				<p class="text-gray-400 mb-6 max-w-sm leading-relaxed">
					Premium Heritage Berkshire Pork, raised with care on small Midwest farms. 
					Experience the world's best pork.
				</p>
				<div class="flex gap-3">
					{#each socialLinks as social}
						<a
							href={social.href}
							class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#c9a86c] hover:text-[#1a1a1a] transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#c9a86c]/50"
							aria-label={social.label}
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path d={social.icon} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Navigation Links (only shown if CMS nav exists) -->
			{#if hasFooterNav}
				<div class="lg:col-span-8 xl:col-span-7">
					<div class="grid grid-cols-2 sm:grid-cols-3 gap-8" style="grid-template-columns: repeat({footerColumns.length}, minmax(0, 1fr));">
						{#each footerColumns as column, colIndex}
							<div>
								<h3 class="mb-4 font-semibold text-white text-sm uppercase tracking-wider">
									{#if colIndex === 0}
										Quick Links
									{:else if colIndex === 1}
										Explore
									{:else if colIndex === 2}
										Resources
									{:else}
										More
									{/if}
								</h3>
								<ul class="space-y-3">
									{#each column as item (item.href + item.label)}
										<li>
											<a 
												href={item.href}
												class={cn(
													'group flex items-center gap-2 text-gray-400 hover:text-[#c9a86c] transition-colors',
													$page.url.pathname === item.href && 'text-[#c9a86c]'
												)}
												target={item.openInNewTab ? '_blank' : undefined}
												rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
											>
												{#if item.icon}
													<svg class="w-4 h-4 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
													</svg>
												{/if}
												<span>{item.label}</span>
												{#if isExternalUrl(item.href) || item.openInNewTab}
													<svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
													</svg>
												{/if}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Bottom Bar -->
		<div class="mt-12 lg:mt-16 pt-8 border-t border-white/10">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
				<p class="text-sm text-gray-500 text-center sm:text-left">
					&copy; {new Date().getFullYear()} Heritage Berkshire Pork. All rights reserved.
				</p>
				<div class="flex items-center gap-6 text-sm text-gray-500">
					<a href="#" class="hover:text-[#c9a86c] transition-colors">Privacy</a>
					<a href="#" class="hover:text-[#c9a86c] transition-colors">Terms</a>
					<a href="#" class="hover:text-[#c9a86c] transition-colors">Sitemap</a>
				</div>
			</div>
		</div>
	</div>
</footer>
