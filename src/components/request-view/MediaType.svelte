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
    if (mime === undefined) return {$error: `Unknown mime type: ${mime}`};
    let z = PickGen(mime);
    if (z === undefined) return {$error: `Unknown mime type: ${mime}`};
    if (z == null) {
      tab = 1;
      hasScEx = false;
      return null;
    }
    let y = z.generate(_p, _f, media.schema);
    return y;
  }

  function handleTabClick(a: number): () => void {
    return function () {
      tab = a;
    };
  }

  let hasEx: boolean = media.example !== undefined;
  let hasExArr: boolean = media.example !== undefined;
  let hasSc: boolean = media.schema !== undefined;
  let hasScEx: boolean = true;
</script>

<div class="media-type">
  {#if hasEx || hasExArr || hasSc}
    <div class="media-type-tabs">
      {#if hasEx || hasExArr || hasScEx}
        <MediaTypeTab i={0} {tab} f={handleTabClick}>Example</MediaTypeTab>
      {/if}
      {#if hasSc}
        {#if hasScEx}
          <span class="media-type-gap" />
        {/if}
        <MediaTypeTab i={1} {tab} f={handleTabClick}>Schema</MediaTypeTab>
      {/if}
    </div>
    <div>
      {#if tab === 0}
        {#if hasEx}
          <Auto mime={mimeType} content={media.example} />
        {:else if hasSc}
          {#await generateExample(mimeType)}
            <div>Loading example...</div>
          {:then x}
            {#if x !== null}
              <Auto mime={mimeType} content={x} />
            {/if}
          {:catch err}
            {console.error(err)}
            <div>Error: {err}</div>
          {/await}
        {/if}
      {:else if tab === 1}
        {#if hasSc}
          <Model {_p} {_f} schema={media.schema} displayName={undefined} topLevel={true} openTopLevel={true} />
        {/if}
      {/if}
    </div>
  {/if}
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
