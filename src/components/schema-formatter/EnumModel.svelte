<script>
  import SchemaCollapse from "./SchemaCollapse.svelte";

  export let value;
</script>

<span class="prop-enum">
  <SchemaCollapse title="Enum:" collapsedContent="Array [ {value.length} ]">
    [ {value.join(", ")} ]
  </SchemaCollapse>
</span>
