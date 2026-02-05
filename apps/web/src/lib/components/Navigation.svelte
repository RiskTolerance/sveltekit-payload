<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { transformNavigation, isActive, getIconPath, isExternalUrl, type NavItem } from '$lib/navigation';
	import type { Navigation as NavigationType } from '$cms';

	interface Props {
		navData: NavigationType | null;
	}

	let { navData }: Props = $props();

	// Transform CMS data to usable format
	let navItems = $derived(transformNavigation(navData));
	let displayItems = $derived(navItems);

	// Mobile menu state
	let isMobileMenuOpen = $state(false);
	
	// Desktop dropdown state (track which dropdown is open)
	let openDropdownIndex = $state<number | null>(null);
	
	// Reference to header for focus management
	let headerRef: HTMLElement;

	// Toggle mobile menu
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen && browser) {
			document.body.style.overflow = 'hidden';
		} else if (browser) {
			document.body.style.overflow = '';
		}
	}

	// Close mobile menu
	function closeMobileMenu() {
		isMobileMenuOpen = false;
		if (browser) {
			document.body.style.overflow = '';
		}
	}

	// Handle dropdown keyboard navigation
	function handleDropdownKeydown(event: KeyboardEvent, index: number) {
		const item = displayItems[index];
		if (!item.children?.length) return;

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				openDropdownIndex = openDropdownIndex === index ? null : index;
				break;
			case 'Escape':
				openDropdownIndex = null;
				break;
			case 'ArrowDown':
				if (openDropdownIndex === index) {
					event.preventDefault();
					// Focus first child
					const firstChild = document.querySelector(`[data-dropdown="${index}"] [data-nav-child]`) as HTMLElement;
					firstChild?.focus();
				}
				break;
		}
	}

	// Handle child item keyboard navigation
	function handleChildKeydown(event: KeyboardEvent, parentIndex: number, childIndex: number) {
		const parent = displayItems[parentIndex];
		if (!parent.children) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (childIndex < parent.children.length - 1) {
					const nextChild = document.querySelector(
						`[data-dropdown="${parentIndex}"] [data-nav-child="${childIndex + 1}"]`
					) as HTMLElement;
					nextChild?.focus();
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (childIndex > 0) {
					const prevChild = document.querySelector(
						`[data-dropdown="${parentIndex}"] [data-nav-child="${childIndex - 1}"]`
					) as HTMLElement;
					prevChild?.focus();
				} else {
					// Focus back to parent
					const parentBtn = document.querySelector(`[data-nav-item="${parentIndex}"]`) as HTMLElement;
					parentBtn?.focus();
				}
				break;
			case 'Escape':
				openDropdownIndex = null;
				const parentBtn = document.querySelector(`[data-nav-item="${parentIndex}"]`) as HTMLElement;
				parentBtn?.focus();
				break;
			case 'Tab':
				if (!event.shiftKey && childIndex === parent.children.length - 1) {
					// Last child - close dropdown
					openDropdownIndex = null;
				}
				break;
		}
	}

	// Click outside to close dropdowns
	$effect(() => {
		if (!browser) return;
		
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLElement;
			if (!target.closest('[data-nav-dropdown]')) {
				openDropdownIndex = null;
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	// Close dropdowns when route changes
	$effect(() => {
		// Reactive dependency on URL
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		$page.url.pathname;
		openDropdownIndex = null;
		closeMobileMenu();
	});
</script>

<header 
	bind:this={headerRef}
	class="sticky top-0 z-50 w-full bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10"
	data-nav-header
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 lg:h-20 items-center justify-between">
			<!-- Logo -->
			<a 
				href="/" 
				class="flex items-center gap-3 shrink-0"
				aria-label="Heritage Berkshire - Home"
			>
				<div class="h-10 w-10 lg:h-12 lg:w-12 bg-[#c9a86c] rounded-full flex items-center justify-center transition-transform hover:scale-105">
					<svg viewBox="0 0 40 40" class="h-6 w-6 lg:h-8 lg:w-8 text-[#1a1a1a]" fill="currentColor" aria-hidden="true">
						<path d="M20 5C12 5 8 12 8 18c0 6 4 10 8 12v3c0 1.1.9 2 2 2s2-.9 2-2v-3c4-2 8-6 8-12 0-6-4-13-8-13z" />
					</svg>
				</div>
				<span class="text-lg lg:text-xl font-bold text-white hidden sm:block">Heritage Berkshire</span>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
				{#each displayItems as item, index (item.label + index)}
					{#if item.children && item.children.length > 0}
						<!-- Dropdown Navigation Item -->
						<div 
							class="relative" 
							data-nav-dropdown
							onmouseenter={() => openDropdownIndex = index}
							onmouseleave={() => openDropdownIndex = null}
							role="region"
							aria-label="{item.label} submenu"
						>
							<button
								data-nav-item={index}
								class={cn(
									'group flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
									item.highlight 
										? 'text-[#c9a86c] bg-[#c9a86c]/10' 
										: isActive(item, $page.url.pathname) 
											? 'text-[#c9a86c]' 
											: 'text-gray-300 hover:text-white hover:bg-white/5'
								)}
								aria-expanded={openDropdownIndex === index}
								aria-haspopup="true"
								onclick={() => openDropdownIndex = openDropdownIndex === index ? null : index}
								onkeydown={(e) => handleDropdownKeydown(e, index)}
							>
								{#if item.icon}
									<svg 
										class="w-4 h-4" 
										fill="none" 
										stroke="currentColor" 
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
									</svg>
								{/if}
								<span>{item.label}</span>
								<svg 
									class={cn(
										'w-4 h-4 transition-transform duration-200',
										openDropdownIndex === index && 'rotate-180'
									)} 
									fill="none" 
									stroke="currentColor" 
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							
							<!-- Dropdown Menu -->
							{#if openDropdownIndex === index}
								<div 
									data-dropdown={index}
									class="absolute top-full left-0 mt-1 w-56 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl shadow-black/20 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
									role="menu"
									aria-orientation="vertical"
								>
									{#each item.children as child, childIndex (child.label + childIndex)}
										<a
											href={child.href}
											data-nav-child={childIndex}
											role="menuitem"
											class="group flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#c9a86c]/50"
											tabindex="-1"
											target={child.openInNewTab ? '_blank' : undefined}
											rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
											onkeydown={(e) => handleChildKeydown(e, index, childIndex)}
										>
											{#if child.icon}
												<svg 
													class="w-4 h-4 text-gray-500 group-hover:text-[#c9a86c]" 
													fill="none" 
													stroke="currentColor" 
													viewBox="0 0 24 24"
												>
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(child.icon)} />
												</svg>
											{/if}
											<span class={cn(
												'text-gray-300 group-hover:text-white',
												$page.url.pathname === child.href && 'text-[#c9a86c]'
											)}>
												{child.label}
											</span>
											{#if child.openInNewTab}
												<svg class="w-3 h-3 ml-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
												</svg>
											{/if}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{:else}
						<!-- Simple Navigation Item -->
						<a
							href={item.href}
							class={cn(
								'group flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
								item.highlight 
									? 'text-[#c9a86c] bg-[#c9a86c]/10 hover:bg-[#c9a86c]/20' 
									: isActive(item, $page.url.pathname) 
										? 'text-[#c9a86c]' 
										: 'text-gray-300 hover:text-white hover:bg-white/5'
							)}
							target={item.openInNewTab ? '_blank' : undefined}
							rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
						>
							{#if item.icon}
								<svg 
									class="w-4 h-4" 
									fill="none" 
									stroke="currentColor" 
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
								</svg>
							{/if}
							<span>{item.label}</span>
							{#if isExternalUrl(item.href)}
								<svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							{/if}
						</a>
					{/if}
				{/each}
			</nav>

			<!-- CTA Button (Desktop) -->
			<div class="hidden lg:block shrink-0">
				<a
					href="/contact-us"
					class="inline-flex items-center justify-center px-5 py-2.5 bg-[#c9a86c] text-[#1a1a1a] font-semibold rounded-md hover:bg-[#d4b87a] transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#c9a86c]/50"
				>
					Get In Touch
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="lg:hidden p-2 -mr-2 text-white rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a86c]/50"
				onclick={toggleMobileMenu}
				aria-expanded={isMobileMenuOpen}
				aria-controls="mobile-menu"
				aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					{#if isMobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div 
			id="mobile-menu"
			class="lg:hidden fixed inset-0 top-16 bg-[#1a1a1a] border-t border-white/10 overflow-y-auto z-40 animate-in slide-in-from-top-2 duration-200"
			role="dialog"
			aria-modal="true"
			aria-label="Mobile navigation"
		>
			<nav class="px-4 py-6 flex flex-col gap-2" aria-label="Mobile navigation">
				{#each displayItems as item, index (item.label + index)}
					<div class="border-b border-white/5 last:border-0 pb-2 last:pb-0">
						{#if item.children && item.children.length > 0}
							<!-- Mobile Dropdown -->
							<div class="space-y-1">
								<button
									class={cn(
										'w-full flex items-center justify-between py-3 text-lg font-medium transition-colors',
										isActive(item, $page.url.pathname) ? 'text-[#c9a86c]' : 'text-white'
									)}
									onclick={() => {
										const el = document.getElementById(`mobile-dropdown-${index}`);
										if (el) {
											el.classList.toggle('hidden');
											el.classList.toggle('block');
										}
									}}
									aria-expanded="false"
								>
									<span class="flex items-center gap-2">
										{#if item.icon}
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
											</svg>
										{/if}
										{item.label}
									</span>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								<div id="mobile-dropdown-{index}" class="hidden pl-4 space-y-1">
									{#each item.children as child, childIndex (child.label + childIndex)}
										<a
											href={child.href}
											class={cn(
												'flex items-center gap-2 py-2 text-sm transition-colors',
												$page.url.pathname === child.href ? 'text-[#c9a86c]' : 'text-gray-400 hover:text-[#c9a86c]'
											)}
											target={child.openInNewTab ? '_blank' : undefined}
											rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
											onclick={closeMobileMenu}
										>
											{#if child.icon}
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(child.icon)} />
												</svg>
											{/if}
											{child.label}
											{#if child.openInNewTab}
												<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
												</svg>
											{/if}
										</a>
									{/each}
								</div>
							</div>
						{:else}
							<!-- Mobile Simple Link -->
							<a
								href={item.href}
								class={cn(
									'flex items-center gap-2 py-3 text-lg font-medium transition-colors',
									isActive(item, $page.url.pathname) ? 'text-[#c9a86c]' : 'text-white hover:text-[#c9a86c]'
								)}
								target={item.openInNewTab ? '_blank' : undefined}
								rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
								onclick={closeMobileMenu}
							>
								{#if item.icon}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getIconPath(item.icon)} />
									</svg>
								{/if}
								{item.label}
								{#if isExternalUrl(item.href)}
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								{/if}
							</a>
						{/if}
					</div>
				{/each}
				
				<!-- Mobile CTA -->
				<a
					href="/contact-us"
					class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#c9a86c] text-[#1a1a1a] font-semibold rounded-md"
					onclick={closeMobileMenu}
				>
					Get In Touch
				</a>
			</nav>
		</div>
	{/if}
</header>

<style>
	/* Animation for dropdown */
	@keyframes fade-in {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	.animate-in {
		animation: fade-in 0.2s ease-out;
	}
	
	/* Prevent body scroll when mobile menu is open */
	:global(body.menu-open) {
		overflow: hidden;
	}
</style>
