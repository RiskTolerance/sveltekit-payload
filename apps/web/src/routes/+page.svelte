<script lang="ts">
  let {data} = $props()
</script>

{#each data.page?.layout as block, i}
  {#if block.blockType === 'hero'}
    <div class="w-full h-[50vh] flex flex-col justify-evenly items-center">
      <div class="gap-4">
          <h1>{block.heading}</h1>
          <h2>{block.subheading}</h2>
      </div>
      <p>{block.cta}</p>
    </div>
  {/if}
{/each}

