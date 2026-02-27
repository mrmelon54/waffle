<script lang="ts">
  import SchemaCollapse from "./SchemaCollapse.svelte";

  interface Props {
    value: any[];
  }

  let { value }: Props = $props();
</script>

<span class="prop-enum">
  <SchemaCollapse title="Enum:" collapseText="Array [ {value.length} ]" beforeText="" afterText="">
    [ {value.join(", ")} ]
  </SchemaCollapse>
</span>
