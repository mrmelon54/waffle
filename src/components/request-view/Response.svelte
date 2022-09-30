<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import ResponseObject from "../../utils/oapi/objects-old/ResponseObject";

  export let key: string;
  export let resp: ResponseObject;
</script>

<tr class="resp-row">
  <td>
    <p>{key}</p>
  </td>
  <td>
    <SvelteMarkdown source={resp.description} />
  </td>
  <td />
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
