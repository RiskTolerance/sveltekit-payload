<script lang="ts">
	import type { RichTextBlock } from '$cms';
	import { RichText } from '$lib/components/ui/rich-text';

	let { block }: { block: RichTextBlock } = $props();
</script>

<!-- NOTE: RichText component is styled with the payload-richtext class in layout.css -->
<RichText content={block.content} />
