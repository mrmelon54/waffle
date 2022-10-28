<script lang="ts">
  import "~/assets/github-dark-dimmed.css";

  import Json from "./Json.svelte";
  import Xml from "./Xml.svelte";

  export let mime: string;
  export let content: string;

  let output: any;
  $: output = MimeToRender[mime];

  var MimeToRender = {
    "application/json": Json,
    "application/xml": Xml,
  };
</script>

{#if output !== undefined}
  <svelte:component this={output} {content} />
{/if}
