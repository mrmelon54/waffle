<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="request-info-content">
  {@render children?.()}
</div>

<style>
  .request-info-content {
    padding: 15px 20px;
  }
</style>
