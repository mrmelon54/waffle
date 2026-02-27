<script lang="ts">
  interface Props {
    i: number;
    tab: number;
    f: (a: number) => () => void;
    children?: import('svelte').Snippet;
  }

  let {
    i,
    tab,
    f,
    children
  }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="media-type-tab" onclick={f(i)}>
  {#if tab === i}
    <b style="color: #25a05c;">{@render children?.()}</b>
  {:else}
    <span>{@render children?.()}</span>
  {/if}
</div>

<style>
  .media-type-tab {
    cursor: pointer;
    padding: 8px;
  }
</style>
