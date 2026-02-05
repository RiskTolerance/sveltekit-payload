<script lang="ts">
	import type { Page } from '$cms';
	import Hero from './blocks/Hero.svelte';
	import RichText from './blocks/RichText.svelte';
	import Image from './blocks/Image.svelte';
	import ImageGallery from './blocks/ImageGallery.svelte';
	import CTA from './blocks/CTA.svelte';
	import Carousel from './blocks/Carousel.svelte';
	import Newsletter from './blocks/Newsletter.svelte';
	import FeatureGrid from './blocks/FeatureGrid.svelte';
	import Testimonial from './blocks/Testimonial.svelte';
	import Stats from './blocks/Stats.svelte';
	import ImageTextSplit from './blocks/ImageTextSplit.svelte';
	import ContactInfo from './blocks/ContactInfo.svelte';

	let { blocks }: { blocks: Page['layout'] } = $props();
</script>

{#each blocks ?? [] as block}
  {#if block.blockType === 'hero'}
    <Hero {block} />
  {:else if block.blockType === 'richText'}
    <RichText {block} />
  {:else if block.blockType === 'image'}
    <Image {block} />
  {:else if block.blockType === 'imageGallery'}
    <ImageGallery {block} />
  {:else if block.blockType === 'cta'}
    <CTA {block} />
  {:else if block.blockType === 'carousel'}
    <Carousel {block} />
  {:else if block.blockType === 'newsletter'}
    <Newsletter {block} />
  {:else if block.blockType === 'featureGrid'}
    <FeatureGrid {block} />
  {:else if block.blockType === 'testimonial'}
    <Testimonial {block} />
  {:else if block.blockType === 'stats'}
    <Stats {block} />
  {:else if block.blockType === 'imageTextSplit'}
    <ImageTextSplit {block} />
  {:else if block.blockType === 'contactInfo'}
    <ContactInfo {block} />
  {/if}
{/each}
