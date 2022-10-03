<script lang="ts">
  export let m: number;
  export let i: number;
  export let tab: number;
  export let f: (a: number) => () => void;
</script>

<span class="media-type-tab {i + 1 < m ? 'media-type-gap' : ''}" on:click={f(i)}>
  {#if tab === i}
    <b><slot /></b>
  {:else}
    <slot />
  {/if}
</span>

<style>
  .media-type-tab {
    position: relative;
    padding: 0 4px;
  }

  .media-type-gap::after {
    content: " ";
    display: block;
    position: absolute;
    top: 50%;
    left: calc(100%+7px);
    transform: translateY(-50%);
    height: 24px;
    width: 2px;
    background: #fff;
  }
</style>
