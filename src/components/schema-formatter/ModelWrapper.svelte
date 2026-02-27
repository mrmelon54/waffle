<script lang="ts">
  interface Props {
    topLevel?: boolean;
    children?: import('svelte').Snippet;
  }

  let { topLevel = false, children }: Props = $props();
</script>

{#if topLevel}
  <div class="model-wrapper">
    {@render children?.()}
  </div>
{:else}
  {@render children?.()}
{/if}

<style>
  .model-wrapper {
    margin: 16px 0;
    overflow-x: auto;
    width: inherit;
  }
</style>
