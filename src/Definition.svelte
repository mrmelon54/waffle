<script>
  import yaml from "js-yaml";
  import { satisfies } from "compare-versions";
  import Document from "./document/Document.svelte";

  export let specUrl;

  async function fetchSpec(url) {
    if (!url) return undefined;
    const resp = await fetch(url);
    const text = await resp.text();
    return yaml.load(text);
  }
</script>

<div id="openapi-definition">
  {#await fetchSpec(specUrl)}
    <div>Loading...</div>
  {:then x}
    {#if x}
      {#if satisfies(x.openapi, "3.1.x")}
        <Document spec={x} />
      {:else}
        <span>Unsupported OpenAPI version: {x.openapi}</span>
      {/if}
    {:else}
      <span>No OpenAPI spec selectod</span>
    {/if}
  {:catch err}
    <span>{err}</span>
  {/await}
</div>
