/**
 * Navigation utilities for transforming and working with CMS navigation data
 */
import type { Navigation, Page } from '$cms';

export type NavLocation = 'header' | 'footer' | 'sidebar' | 'utility';

export interface NavItemChild {
	label: string;
	href: string;
	icon?: string;
	openInNewTab?: boolean;
	description?: string;
}

export interface NavItem {
	label: string;
	href: string;
	icon?: string;
	openInNewTab?: boolean;
	highlight?: boolean;
	description?: string;
	children?: NavItemChild[];
}

/**
 * Extract href from a nav item's link data
 */
function getHref(
	linkType: 'page' | 'custom',
	page: Page | number | null | undefined,
	url: string | null | undefined
): string {
	if (linkType === 'custom' && url) {
		return url;
	}

	if (linkType === 'page' && page && typeof page === 'object') {
		return `/${page.slug}`;
	}

	return '/';
}

/**
 * Transform a CMS Navigation into a clean array of NavItems
 */
export function transformNavigation(navData: Navigation | null): NavItem[] {
	if (!navData?.items || navData.items.length === 0) {
		return [];
	}

	return navData.items.map((item) => {
		const href = getHref(item.linkType, item.page, item.url);

		const navItem: NavItem = {
			label: item.label,
			href,
			icon: item.icon && item.icon !== 'none' ? item.icon : undefined,
			openInNewTab: item.openInNewTab ?? false,
			highlight: item.highlight ?? false,
			description: item.description ?? undefined
		};

		// Transform children if they exist
		if (item.children && item.children.length > 0) {
			navItem.children = item.children.map((child) => ({
				label: child.label,
				href: getHref(child.linkType, child.page, child.url),
				icon: child.icon && child.icon !== 'none' ? child.icon : undefined,
				openInNewTab: child.openInNewTab ?? false,
				description: child.description ?? undefined
			}));
		}

		return navItem;
	});
}

/**
 * Check if an item has active children
 */
export function hasActiveChild(item: NavItem, currentPath: string): boolean {
	if (!item.children) return false;
	return item.children.some((child) => child.href === currentPath);
}

/**
 * Check if an item is active (exact match or has active child)
 */
export function isActive(item: NavItem, currentPath: string): boolean {
	return item.href === currentPath || hasActiveChild(item, currentPath);
}

/**
 * Group navigation items by columns (useful for footer mega menus)
 */
export function groupNavItems(items: NavItem[], columns: number): NavItem[][] {
	const grouped: NavItem[][] = Array.from({ length: columns }, () => []);
	items.forEach((item, index) => {
		grouped[index % columns].push(item);
	});
	return grouped;
}

/**
 * Get icon SVG path for common navigation icons
 */
export function getIconPath(iconName: string): string {
	const icons: Record<string, string> = {
		home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
		about: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		products: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
		contact: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
		email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		external: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
	};

	return icons[iconName] || icons.external;
}

/**
 * Check if a URL is external
 */
export function isExternalUrl(url: string): boolean {
	return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
}


