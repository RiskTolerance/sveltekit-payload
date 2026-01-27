<script lang="ts">
	import type { ImageBlock } from '$cms';
	import { Image } from '$lib/components/ui/image';
	import { cn } from '$lib/utils.js';

	let { block }: { block: ImageBlock } = $props();

  let alignment = $derived.by(() => {
    const cases = {
      full: 'w-full h-full',
      left: 'w-fit mr-auto',
      right: 'w-fit ml-auto',
      center: 'w-fit mx-auto',
    }
    return cases[block.alignment as keyof typeof cases] ?? 'w-fit mx-auto'
  });

  let imageFit = $derived.by(() => {
    const fit = block.imageFit ?? 'cover'
    const cases = {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    }
    return cases[fit as keyof typeof cases] ?? 'object-cover'
  });

  let maxHeight = $derived.by(() => {
    const cases = {
      '100vh': 'max-h-screen',
      '50vh': 'max-h-[50vh]',
      '25vh': 'max-h-[25vh]',
    }
    return cases[block.maxHeight as keyof typeof cases] ?? ''
  });
</script>

	<Image media={block.image} class={cn(["object-center", alignment, imageFit, maxHeight])} />
