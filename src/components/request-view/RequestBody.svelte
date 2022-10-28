<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { RequestBodyObject } from "../../utils/oapi/objects/RequestBodyObject";
  import type Ctx from "../../utils/oapi/utils/Ctx";
  import type OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import type OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";
  import Selector from "../Selector.svelte";
  import RequestInfoHeader from "./bubble/RequestInfoHeader.svelte";
  import RequestInfoContent from "./bubble/RequestInfoContent.svelte";
  import MediaType from "./MediaType.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let requestBody: RequestBodyObject | Ref<RequestBodyObject>;

  function getRequestBody(): Promise<Ctx<RequestBodyObject>> {
    return Ref.getValueOrRef(_p, _f, requestBody, async (x) => <RequestBodyObject>x);
  }

  let contentType: string = "";
</script>

<div class="request-description">
  {#await getRequestBody()}
    <RequestInfoHeader title="Request Body" required={true} />
    <RequestInfoContent>
      <span>Loading...</span>
    </RequestInfoContent>
  {:then x}
    <RequestInfoHeader title="Request Body" required={true}>
      <Selector bind:value={contentType}>
        {#each Object.keys(x.v.content) as t}
          <option value={t}>{t}</option>
        {/each}
      </Selector>
    </RequestInfoHeader>
    <RequestInfoContent>
      {#if x.v.description !== undefined}
        <SvelteMarkdown source={x.v.description} />
      {:else}
        <p />
      {/if}
      {#if contentType !== undefined && contentType !== ""}
        {#key contentType}
          <MediaType {_p} {_f} media={x.v.content[contentType]} mimeType={contentType} />
        {/key}
      {:else}
        <div>Missing content type</div>
      {/if}
    </RequestInfoContent>
  {:catch err}
    {console.error(err)}
    <div>Request Body Error: {err}</div>
  {/await}
</div>
