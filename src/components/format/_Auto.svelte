<script lang="ts">
  import Json from "./Json.svelte";
  import Xml from "./Xml.svelte";

  interface Props {
    mime: string;
    content: string;
  }

  let { mime, content }: Props = $props();

  let output: any = $derived(MimeToRender[mime]);

  var MimeToRender = {
    "application/json": Json,
    "application/xml": Xml,
  };
</script>

{#if output !== undefined}
  {@const SvelteComponent = output}
  <SvelteComponent {content} />
{/if}
