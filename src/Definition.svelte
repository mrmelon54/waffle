<script lang="ts">
  import Document from "./document/Document.svelte";
  import MultipleFileSpec from "./utils/oapi/utils/MultipleFileSpec";
  import OpenApiContext from "./utils/oapi/utils/OpenApiContext";

  export let specUrl: string;
  let manager = new MultipleFileSpec();

  async function fetchSpec(url: string): Promise<OpenApiContext> {
    if (!url) return Promise.reject(`No OpenAPI spec selected`);
    return await OpenApiContext.generate(manager, url);
  }
</script>

<div id="openapi-definition">
  {#await fetchSpec(specUrl)}
    <div>Loading...</div>
  {:then x}
    <Document spec={x.get()} />
  {:catch err}
    {console.error("[Definition]", err)}
    <div id="spec-errors">{err}</div>
  {/await}
</div>
