<script lang="ts">
  import SvelteMarkdown, { type Renderers } from "svelte-markdown";
  import NewTabLink from "./NewTabLink.svelte";
  interface Props {
    [key: string]: any
  }

  let { ...rest }: Props = $props();

  let source: string = "";
  let renderers: Partial<Renderers>;
</script>

<SvelteMarkdown {source} renderers={{ link: NewTabLink, ...renderers }} {...rest} />
