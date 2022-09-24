<script lang="ts">
  import Title from "./Title.svelte";
  import Schemas from "./Schemas.svelte";
  import Selector from "../components/Selector.svelte";
  import RequestCategories from "./RequestCategories.svelte";
  import OpenApiObject from "../utils/oapi-objects/OpenApiObject";

  export let spec: OpenApiObject;

  let serverUrl: string;
</script>

<div id="openapi-document">
  <Title {spec} />
  {#if spec.servers.isFull()}
    <div id="servers">
      <h4>Servers</h4>
      <Selector bind:value={serverUrl}>
        {#each spec.servers.get() as server}
          <option value={server.url}>
            {#if server.description.isFull()}
              {server.url} - {server.description.get()}
            {:else}
              {server.url}
            {/if}
          </option>
        {/each}
      </Selector>
    </div>
  {/if}
  <div class="doc-gap" />
  <RequestCategories tags={spec.tags} paths={spec.paths} components={spec.components} />
  <div class="doc-gap" />
  {#if spec.components.isFull()}
    <Schemas schemas={spec.components.get().schemas} />
  {/if}
</div>

<style>
  #servers {
    background: #252832;
    padding: 16px;
    border-radius: 16px;
  }

  #servers h4 {
    margin: 0 0 8px 0;
  }

  .doc-gap {
    height: 16px;
  }
</style>
