<script>
  import Title from "./Title.svelte";
  import Paths from "./Paths.svelte";
  import Schemas from "./Schemas.svelte";
  import Selector from "../components/Selector.svelte";

  export let spec;
  let serverUrl;
</script>

<div id="openapi-document">
  <Title {spec} />
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
  <Paths paths={spec.paths} components={spec.components} />
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
</style>
