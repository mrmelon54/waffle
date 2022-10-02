<script lang="ts">
  import Document from "./document/Document.svelte";
  import OpenApiParser from "./utils/oapi/utils/OpenApiParser";

  export let spec: URL | undefined;

  async function fetchSpec(url: URL): Promise<OpenApiParser> {
    if (url === undefined) return Promise.reject(`No OpenAPI spec selected`);
    return await OpenApiParser.create(url);
  }
</script>

<div id="openapi-definition">
  {#await fetchSpec(spec)}
    <div>Loading...</div>
  {:then x}
    <Document _p={x} _f={x.mainFile} spec={x.mainFile.value} />
  {:catch err}
    {console.error("[Definition]", err)}
    <div id="spec-errors">{err}</div>
  {/await}
</div>
