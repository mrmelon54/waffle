<script lang="ts">
  import Document from "./document/Document.svelte";
  import MultipleFileSpec from "./utils/MultipleFileSpec";
  import OpenApiObject from "./utils/oapi-objects/OpenApiObject";

  export let specUrl: string;
  let manager = new MultipleFileSpec();

  async function fetchSpec(url: string) {
    if (!url) return undefined;
    let file = await manager.fetchAndParse(url);
    return new OpenApiObject(file);
  }
</script>

<div id="openapi-definition">
  {#await fetchSpec(specUrl)}
    <div>Loading...</div>
  {:then x}
    {#if x}
      {#if x.valid()}
        <Document spec={x} />
      {:else}
        <div id="spec-errors">
          <ul>
            {#each x.$$err.errors as err}
              <li>{err}</li>
            {/each}
          </ul>
        </div>
      {/if}
    {:else}
      <span>No OpenAPI spec selectod</span>
    {/if}
  {:catch err}
    <span>{err}</span>
  {/await}
</div>
