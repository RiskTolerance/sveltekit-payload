<script lang="ts">
  import { getMedia } from "$lib/payload";
  let {data} = $props()

</script>

  <p class="text-4xl mx-auto w-fit">BLOCKS</p>

<div class="p-8 md:p-16">
  {#each data.page?.layout as block, i}
    {#if block.blockType === 'hero'}
    {@const bg = getMedia(block.backgroundImage)}
    <div class="w-full h-[50vh] flex flex-col justify-evenly items-center">
      <div class="gap-4">
        <h1>{block.heading}</h1>
        <h2>{block.subheading}</h2>
        {#if bg && bg.url}
              <img src={bg.url} alt={bg.alt} />
            {/if}
        </div>
        <a class="bg-slate-200 px-3 py-1 rounded-sm border border-slate-300" href={block.cta?.link}>{block.cta?.label}</a>
      </div>
    {/if}
  {/each}
</div>
