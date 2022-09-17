<script>
  import Highlight from "svelte-highlight";
  import json from "svelte-highlight/languages/json";

  import "svelte-highlight/styles/stackoverflow-dark.css";

  export let content;
</script>

<div class="json-formatter">
  <Highlight language={json} code={JSON.stringify(content, null, 2)} />
</div>
