<script lang="ts">
  import Title from "./Title.svelte";
  import Schemas from "./Schemas.svelte";
  import Selector from "../components/Selector.svelte";
  import RequestCategories from "./RequestCategories.svelte";
  import OpenApiObject from "../utils/oapi/objects-old/OpenApiObject";

  export let spec: OpenApiObject;

  let serverUrl: string;
</script>

<div id="openapi-document">
  <Title {spec} />
  {#if spec.servers.hasError()}
    <div id="servers">
      <h4>Servers</h4>
      <p>{spec.servers.errorReason()}</p>
    </div>
    <div class="doc-gap" />
  {:else if spec.servers.isFull()}
    <div class="bubble-block">
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
    <div class="doc-gap" />
  {/if}
  <RequestCategories tags={spec.tags} paths={spec.paths} components={spec.components} />
  {#if spec.components.hasError()}
    <div class="doc-gap" />
    <div class="bubble-block">
      <h4>Schemas</h4>
      <p>{spec.components.errorReason()}</p>
    </div>
  {:else if spec.components.isFull() && spec.components.get().schemas.isFull()}
    <div class="doc-gap" />
    <Schemas schemas={spec.components.get().schemas.get()} />
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
