<script lang="ts">
	import type { RichTextBlock } from '$cms';
	import { RichText } from '$lib/components/ui/rich-text';

	let { block }: { block: RichTextBlock } = $props();
</script>

<div class="w-full py-8">
	<div class="mx-auto max-w-4xl px-4">
		<RichText content={block.content} />
	</div>
</div>
