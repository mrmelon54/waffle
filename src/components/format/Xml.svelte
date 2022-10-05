<script lang="ts">
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";
  import formatXml from "xml-formatter";

  import "svelte-highlight/styles/github-dark-dimmed.css";

  export let content: string;

  function format(a: string): string {
    return formatXml(a, {
      indentation: "  ",
      collapseContent: true,
      lineSeparator: "\n",
    });
  }
</script>

<div class="xml-formatter">
  <Highlight language={xml} code={format(content)} />
</div>

<style>
  .xml-formatter > :global(pre > code.hljs) {
    border-radius: 8px;
  }
</style>
