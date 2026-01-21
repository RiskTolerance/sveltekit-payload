import type { Media } from '$cms'

const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL ?? 'http://localhost:3000'

/**
 * Converts a relative Payload media URL to an absolute URL
 */
function convertMediaUrl(url: string | null | undefined): string | null {
	if (!url) return null

	// If already absolute, return as-is
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url
	}

	// If relative, prepend Payload URL
	return `${PAYLOAD_URL}${url.startsWith('/') ? url : `/${url}`}`
}

/**
 * Converts URLs in the sizes object recursively
 */
function convertSizesUrls(
	sizes: Media['sizes'] | null | undefined
): Media['sizes'] | undefined {
	if (!sizes) return undefined

	const converted: Media['sizes'] = {}

	for (const [sizeName, sizeData] of Object.entries(sizes)) {
		if (sizeData && typeof sizeData === 'object' && 'url' in sizeData) {
			converted[sizeName as keyof typeof sizes] = {
				...sizeData,
				url: convertMediaUrl(sizeData.url ?? null),
			}
		}
	}

	return converted
}

/**
 * Type guard and URL converter - returns Media object with absolute URLs
 */
export function getMedia(value: number | Media | null | undefined): Media | null {
	if (typeof value === 'object' && value !== null && 'url' in value) {
		return {
			...value,
			url: convertMediaUrl(value.url),
			sizes: convertSizesUrls(value.sizes),
		}
	}
	return null
}
