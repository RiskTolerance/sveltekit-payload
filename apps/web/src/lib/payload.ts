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
 * Type guard and URL converter - returns Media object with absolute URL
 */
export function getMedia(value: number | Media | null | undefined): Media | null {
	if (typeof value === 'object' && value !== null && 'url' in value) {
		return {
			...value,
			url: convertMediaUrl(value.url)
		}
	}
	return null
}
