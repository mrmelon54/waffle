<script lang="ts">
  interface Props {
    open?: boolean;
    title: any;
    children?: import('svelte').Snippet;
  }

  let { open = $bindable(false), title, children }: Props = $props();

  function handleClick() {
    open = !open;
  }
</script>

<div class="dropdown {open ? 'dropdown-open' : 'dropdown-closed'}">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="dropdown-title" onclick={handleClick}>
    <h4>{title}</h4>
  </div>
  {#if open}
    <div class="dropdown-content">
      {@render children?.()}
    </div>
  {/if}
</div>

<style lang="scss">
  .dropdown {
    background: #252832;
    padding: 8px 16px;
    border-radius: 16px;

    > .dropdown-title {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        background: transparent url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23c7c2bb" d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"/></svg>') right 10px center no-repeat;
        background-size: 40px;
        width: 60px;
        height: 60px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        transition: ease-in-out transform 500ms;
      }
    }

    &.dropdown-open > .dropdown-title::after {
      transform: translateY(-50%) rotate(180deg);
    }
  }
</style>
