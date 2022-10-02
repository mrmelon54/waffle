<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import { ResponseObject } from "../../utils/oapi/objects/ResponseObject";
  import Ref from "../../utils/oapi/utils/Ref";

  export let key: string;
  export let resp: ResponseObject | Ref<ResponseObject>;
</script>

<tr class="resp-row">
  <td>
    <p>{key}</p>
  </td>
  {#await Ref.getValueOrRef(resp, { description: "**ERROR:** Invalid reference" })}
    <td>Loading...</td>
    <td />
  {:then x}
    <td>
      <SvelteMarkdown source={x.description} />
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
