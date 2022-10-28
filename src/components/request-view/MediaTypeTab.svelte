<script lang="ts">
  export let i: number;
  export let tab: number;
  export let f: (a: number) => () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="media-type-tab" on:click={f(i)}>
  {#if tab === i}
    <b style="color: #25a05c;"><slot /></b>
  {:else}
    <span><slot /></span>
  {/if}
</div>

<style>
  .media-type-tab {
    cursor: pointer;
    padding: 8px;
  }
</style>
