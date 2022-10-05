<script lang="ts">
  import {PickGen} from "../../utils/oapi/gen/_PickGen";
  import {MediaTypeObject} from "../../utils/oapi/objects/MediaTypeObject";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Auto from "../format/_Auto.svelte";
  import Model from "../schema-formatter/Model.svelte";
  import MediaTypeTab from "./MediaTypeTab.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let media: MediaTypeObject;
  export let mimeType: string;

  let tab: number = 0;

  async function generateExample(mime: string): Promise<any> {
    let z = PickGen(mime);
    if (z === undefined) return {$error: `Unknown mine type: ${mime}`};
    let y = z.generate(_p, _f, media.schema);
    return y;
  }

  function handleTabClick(a: number): () => void {
    return function () {
      tab = a;
    };
  }
</script>

<div class="media-type">
  <div class="media-type-tabs">
    <MediaTypeTab i={0} {tab} f={handleTabClick}>Example</MediaTypeTab>
    <span class="media-type-gap" />
    <MediaTypeTab i={1} {tab} f={handleTabClick}>Schema</MediaTypeTab>
  </div>
  <div>
    {#if tab === 0}
      {#await generateExample(mimeType)}
        <div>Loading example...</div>
      {:then x}
        <Auto mime={mimeType} content={x} />
      {:catch err}
        {console.error(err)}
        <div>Error: {err}</div>
      {/await}
    {:else if tab === 1}
      <Model {_p} {_f} schema={media.schema} displayName={undefined} topLevel={true} openTopLevel={true} />
    {/if}
  </div>
</div>

<style>
  .media-type-tabs {
    display: flex;
    align-items: center;
  }

  .media-type-gap {
    display: block;
    height: 28px;
    width: 2px;
    background: #c7c2bb;
    margin: 0 8px;
  }
</style>
