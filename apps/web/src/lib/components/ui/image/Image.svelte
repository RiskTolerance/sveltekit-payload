<script lang="ts" module>
	import type { Media } from '$cms'
	import type { HTMLImgAttributes } from 'svelte/elements'
	import { cn, type WithElementRef } from '$lib/utils.js'

	export type ImageProps = WithElementRef<HTMLImgAttributes> & {
		media: Media | number | null | undefined
		alt?: string // Override alt text
		loading?: 'lazy' | 'eager'
		sizes?: string // Custom sizes attribute for responsive images
	}
</script>

<script lang="ts">
	import { getMedia } from '$lib/payload.js'

	let {
		media,
		alt: altOverride,
		class: className,
		loading = 'lazy',
		sizes: customSizes,
		ref = $bindable(null),
		...restProps
	}: ImageProps = $props()

	const mediaObj = $derived(getMedia(media))

	// Extract sizes into an array and sort by width
	const sizesArray = $derived.by(() => {
		if (!mediaObj?.sizes) return []

		const sizes: Array<{ url: string; width: number }> = []

		for (const [name, sizeData] of Object.entries(mediaObj.sizes)) {
			if (sizeData && typeof sizeData === 'object' && sizeData.url && sizeData.width) {
				sizes.push({
					url: sizeData.url,
					width: sizeData.width,
				})
			}
		}

		// Sort by width ascending
		return sizes.sort((a, b) => a.width - b.width)
	})

	// Generate srcset string
	const srcset = $derived.by(() => {
		if (sizesArray.length === 0) return undefined
		return sizesArray
			.map((size) => `${size.url} ${size.width}w`)
			.join(', ')
	})

	// Generate default sizes attribute if not provided
	const defaultSizes = $derived.by(() => {
		if (customSizes) return customSizes
		if (sizesArray.length === 0) return undefined

		// Default responsive sizes based on common breakpoints
		return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
	})

	// Use largest size as default src, fallback to main url
	const src = $derived.by(() => {
		if (sizesArray.length > 0) {
			const largest = sizesArray[sizesArray.length - 1]
			return largest.url
		}
		return mediaObj?.url ?? undefined
	})

	// Use alt from media object or override
	const alt = $derived(altOverride ?? mediaObj?.alt ?? '')
</script>

{#if mediaObj && src}
	<img
		bind:this={ref}
		class={cn(className)}
		src={src}
		srcset={srcset}
		sizes={defaultSizes}
		alt={alt}
		loading={loading}
		{...restProps}
	/>
{/if}

