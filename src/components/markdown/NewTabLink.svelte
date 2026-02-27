<script lang="ts">
  interface Props {
    href?: string;
    title?: any;
    children?: import('svelte').Snippet;
  }

  let { href = "", title = undefined, children }: Props = $props();
</script>

<a target="_blank" rel="noreferrer noopener nofollow" {href} {title}>{@render children?.()}</a>
