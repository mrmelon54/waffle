<script lang="ts">
  import SvelteMarkdown, { type Renderers } from "svelte-markdown";
  import NewTabLink from "./NewTabLink.svelte";

  let source: string = "";
  let renderers: Partial<Renderers>;
</script>

<SvelteMarkdown {source} renderers={{ link: NewTabLink, ...renderers }} {...$$restProps} />
