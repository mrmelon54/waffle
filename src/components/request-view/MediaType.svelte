<script lang="ts">
  import {MediaTypeObject} from "../../utils/oapi/objects/MediaTypeObject";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import JsonFormatter from "../JsonFormatter.svelte";
  import Model from "../schema-formatter/Model.svelte";
  import MediaTypeTab from "./MediaTypeTab.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let media: MediaTypeObject;

  let tab: number = 0;

  function handleTabClick(a: number): () => void {
    return function () {
      tab = a;
    };
  }
</script>

<div>
  <div>
    <MediaTypeTab m={2} i={0} {tab} f={handleTabClick}>Example</MediaTypeTab>
    <MediaTypeTab m={2} i={1} {tab} f={handleTabClick}>Schema</MediaTypeTab>
  </div>
  <div>
    {#if tab === 0}
      <JsonFormatter content={media} />
    {:else if tab === 1}
      <Model {_p} {_f} schema={media.schema} displayName={undefined} topLevel={true} />
    {/if}
  </div>
</div>
