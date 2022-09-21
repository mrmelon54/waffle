<script>
  import Title from "./Title.svelte";
  import Schemas from "./Schemas.svelte";
  import Selector from "../components/Selector.svelte";
  import RequestCategories from "./RequestCategories.svelte";

  export let spec;

  let serverUrl;
  if (spec.tags === undefined) spec.tags = [];
  if (spec.paths === undefined) spec.paths = {};
  if (spec.components === undefined) spec.components = {};
  if (spec.components.responses === undefined) spec.components.responses = {};
  if (spec.components.schemas === undefined) spec.components.schemas = {};
</script>

<div id="openapi-document">
  <Title {spec} />
  {#if spec.servers}
    <div id="servers">
      <h4>Servers</h4>
      <Selector bind:value={serverUrl}>
        {#each spec.servers as server}
          <option value={server.url}>
            {server.url} - {server.description}
          </option>
        {/each}
      </Selector>
    </div>
  {/if}
  <div class="doc-gap" />
  <RequestCategories tags={spec.tags} paths={spec.paths} components={spec.components} />
  <div class="doc-gap" />
  <Schemas schemas={spec.components.schemas} />
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
