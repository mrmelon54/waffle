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

<div class="media-type">
  <div class="media-type-tabs">
    <MediaTypeTab i={0} {tab} f={handleTabClick}>Example</MediaTypeTab>
    <span class="media-type-gap" />
    <MediaTypeTab i={1} {tab} f={handleTabClick}>Schema</MediaTypeTab>
  </div>
  <div>
    {#if tab === 0}
      <JsonFormatter content={media} />
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
    background: #ffffff;
    margin: 0 12px;
  }
</style>
