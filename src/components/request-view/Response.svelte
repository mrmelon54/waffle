<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { ResponseObject } from "../../utils/oapi/objects/ResponseObject";
  import type OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import type OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";
  import MediaType from "./MediaType.svelte";
  import Selector from "../Selector.svelte";
  import type Ctx from "../../utils/oapi/utils/Ctx";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let key: string;
  export let resp: ResponseObject | Ref<ResponseObject>;

  function getResponse(): Promise<Ctx<ResponseObject>> {
    return Ref.getValueOrRef(_p, _f, resp, async (x) => <ResponseObject>x);
  }

  let contentType: string = "";
</script>

<tr class="resp-row">
  <td>
    <p>{key}</p>
  </td>
  {#await getResponse()}
    <td>Loading...</td>
  {:then x}
    <td>
      {#if x.v.description !== undefined}
        <SvelteMarkdown source={x.v.description} />
      {:else}
        <p />
      {/if}
      {#if x.v.content !== undefined}
        <h5 class="response-accept-header">
          Accept Header:
          <Selector bind:value={contentType}>
            {#each Object.keys(x.v.content) as t}
              <option value={t}>{t}</option>
            {/each}
          </Selector>
        </h5>
        {#if contentType !== undefined && contentType !== ""}
          {#key contentType}
            <MediaType {_p} {_f} media={x.v.content[contentType]} mimeType={contentType} />
          {/key}
        {:else}
          <div>Missing content type</div>
        {/if}
      {/if}
    </td>
  {/await}
</tr>

<style lang="scss">
  tr.resp-row:nth-of-type(n + 3) {
    border-top: 2px solid #8e8880;
  }

  tr.resp-row {
    > td {
      vertical-align: top;
      text-align: left;
      padding-left: 0.76em;
    }

    > td:first-child {
      padding-left: 0;
    }
  }

  .response-accept-header {
    margin: 0 8px;
  }
</style>
