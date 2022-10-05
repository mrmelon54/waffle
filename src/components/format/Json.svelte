<script>
  import Highlight from "svelte-highlight";
  import json from "svelte-highlight/languages/json";

  import "svelte-highlight/styles/github-dark-dimmed.css";

  export let content;
</script>

<div class="json-formatter">
  <Highlight language={json} code={JSON.stringify(content, null, 2)} />
</div>

<style>
  .json-formatter > :global(pre > code.hljs) {
    border-radius: 8px;
  }
</style>
