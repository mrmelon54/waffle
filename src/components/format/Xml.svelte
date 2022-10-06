<script lang="ts">
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import formatXml from "xml-formatter";

  import "svelte-highlight/styles/github-dark-dimmed.css";

  export let content: string;

  async function format(a: string): Promise<string> {
    return formatXml(a, {
      indentation: "  ",
      collapseContent: true,
      lineSeparator: "\n",
    });
  }
</script>

<div class="xml-formatter">
  {#await format(content)}
    <div>Loading...</div>
  {:then x}
    <Highlight language={xml} code={x} />
  {:catch err}
    <div>Xml Rendering Error: {err}</div>
  {/await}
</div>

<style>
  .xml-formatter > :global(pre > code.hljs) {
    border-radius: 8px;
  }
</style>
