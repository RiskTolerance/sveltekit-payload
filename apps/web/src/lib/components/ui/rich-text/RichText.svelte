<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	export type RichTextProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		content: Record<string, unknown> | null | undefined;
	};
</script>

<script lang="ts">
	import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

	let {
		content,
		class: className,
		...restProps
	}: RichTextProps = $props();

	const html = $derived.by(() => {
		if (!content) return '';
		try {
			return convertLexicalToHTML({ data: content as unknown as Parameters<typeof convertLexicalToHTML>[0]['data'] });
		} catch (error) {
			console.error('Error converting Lexical to HTML:', error);
			return '';
		}
	});
</script>

<!-- NOTE: RichText component is styled with the payload-richtext class in layout.css -->
{#if html}
	{@html html}
{/if}
