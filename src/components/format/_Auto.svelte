<script lang="ts">
  export let mime: string;
  export let content: string;

  let output: any;
  $: output = MimeToRender[mime];

  import Json from "./Json.svelte";
  import Xml from "./Xml.svelte";

  var MimeToRender = {
    "application/json": Json,
    "application/xml": Xml,
  };
</script>

{#if output !== undefined}
  <svelte:component this={output} {content} />
{/if}
