<script>
  export let topLevel = false;
</script>

{#if topLevel}
  <div class="model-wrapper">
    <slot />
  </div>
{:else}
  <slot />
{/if}

<style>
  .model-wrapper {
    margin: 16px;
  }
</style>
