<script lang="ts">
  import Title from "./Title.svelte";
  import Schemas from "./Schemas.svelte";
  import Selector from "../components/Selector.svelte";
  import RequestCategories from "./RequestCategories.svelte";
  import { OpenApiObject } from "../utils/oapi/objects/OpenApiObject";

  export let spec: OpenApiObject;

  let serverUrl: string;
</script>

<div id="openapi-document">
  <Title {spec} />
  {#if spec.servers !== undefined}
    <div id="servers" class="bubble-block">
      <h4>Servers</h4>
      <Selector bind:value={serverUrl}>
        {#each spec.servers as server}
          <option value={server.url}>
            {#if server.description !== undefined}
              {server.url} - {server.description}
            {:else}
              {server.url}
            {/if}
          </option>
        {/each}
      </Selector>
    </div>
    <div class="doc-gap" />
  {/if}
  <RequestCategories tags={spec.tags} paths={spec.paths} components={spec.components} />
  {#if spec.components !== undefined && spec.components.schemas !== undefined}
    <div class="doc-gap" />
    <Schemas schemas={spec.components.schemas} />
  {/if}
</div>

<style>
  .bubble-block {
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
