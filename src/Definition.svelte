<script lang="ts">
  import { get } from "svelte/store";
  import Document from "./document/Document.svelte";
  import MultipleFileSpec from "./utils/MultipleFileSpec";
  import OpenApiContext from "./utils/oapi/utils/OpenApiContext";
  import Optional from "./utils/Optional";
  import StaticOptional from "./utils/StaticOptional";

  export let specUrl: string;
  let manager = new MultipleFileSpec();

  async function fetchSpec(url: string): Promise<Optional<OpenApiContext>> {
    if (!url) return StaticOptional.emptyWithError(`No OpenAPI spec selected`);
    return await OpenApiContext.generate(manager, url);
  }
</script>

<div id="openapi-definition">
  {#await fetchSpec(specUrl)}
    <div>Loading...</div>
  {:then x}
    {#if x.isFull()}
      {console.log("a:", x.get())}
      <Document spec={x.get().get()} />
    {:else}
      <div id="spec-errors">
        {x.errorReason() ?? "No reason"}
      </div>
    {/if}
  {:catch err}
    {console.error(err)}
    <span>{err}</span>
  {/await}
</div>
