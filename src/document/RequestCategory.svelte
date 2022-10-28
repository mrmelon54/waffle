<script lang="ts">
  import RequestView from "../components/request-view/RequestView.svelte";
  import type { TagObject } from "../utils/oapi/objects/TagObject";
  import type OpenApiFile from "../utils/oapi/utils/OpenApiFile";
  import type OpenApiParser from "../utils/oapi/utils/OpenApiParser";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let category: TagObject;
  export let open = false;

  function handleClick() {
    open = !open;
  }
</script>

<div class="category {open ? 'category-dropdown-open' : 'category-dropdown-closed'}">
  <a href="?category={category.name}" class="category-summary" on:click|preventDefault={handleClick}>
    <div class="category-summary-inner">
      <h5>
        <span class="category-summary-name">{category.name}</span>
        {#if category.description !== undefined}
          <span class="request-summary-text">{category.description}</span>
        {/if}
      </h5>
    </div>
  </a>
  {#if open}
    <div class="category-content">
      {#each category.$$requests as req}
        <RequestView {_p} {_f} {req} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .category {
    display: block;
    background: #252832;
    padding: 8px 16px;
    border-radius: 16px;

    > .category-summary {
      position: relative;

      ::after {
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

      > .category-summary-inner > h5 {
        margin: 0;
        padding: 16px 0;

        > .category-summary-name {
          margin-right: 16px;
        }
      }
    }
  }

  .category.category-dropdown-open > .category-summary::after {
    transform: translateY(-50%) rotate(180deg);
  }
</style>
