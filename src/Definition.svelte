<script lang="ts">
  import Document from "./document/Document.svelte";
  import MultipleFileSpec from "./utils/MultipleFileSpec";
  import OpenApiObject from "./utils/oapi/objects/OpenApiObject";
  import Optional from "./utils/Optional";

  export let specUrl: string;
  let manager = new MultipleFileSpec();

  async function fetchSpec(url: string): Promise<Optional<OpenApiObject>> {
    if (!url) return undefined;
    return await manager.fetchAndParse(url);
  }
</script>

<div id="openapi-definition">
  {#await fetchSpec(specUrl)}
    <div>Loading...</div>
  {:then x}
    {#if x}
      {#if x.isFull()}
        <Document spec={x.get()} />
      {:else}
        <div id="spec-errors">
          {x.errorReason() ?? "No reason"}
        </div>
      {/if}
    {:else}
      <div id="spec-missing">No OpenAPI spec selectod</div>
    {/if}
  {:catch err}
    <span>{err}</span>
  {/await}
</div>
