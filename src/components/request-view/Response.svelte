<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import { ResponseObject } from "../../utils/oapi/objects/ResponseObject";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let key: string;
  export let resp: ResponseObject | Ref<ResponseObject>;
</script>

<tr class="resp-row">
  <td>
    <p>{key}</p>
  </td>
  {#await Ref.getValueOrRef(_p, _f, resp, (x) => Promise.resolve(x))}
    <td>Loading...</td>
    <td />
  {:then x}
    <td>
      <SvelteMarkdown source={x.v.description} />
    </td>
    <td>
      <p>No links</p>
    </td>
  {/await}
</tr>

<style>
  tr.resp-row > td {
    vertical-align: top;
    text-align: left;
    padding-left: 0.76em;
  }

  tr.resp-row > td:first-child {
    padding-left: 0;
  }
</style>
