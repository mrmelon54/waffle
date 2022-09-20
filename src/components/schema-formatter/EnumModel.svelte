<script>
  import SchemaCollapse from "./SchemaCollapse.svelte";

  export let value;
</script>

<span class="prop-enum">
  <SchemaCollapse title="Enum:" collapseText="Array [ {value.length} ]">
    [ {value.join(", ")} ]
  </SchemaCollapse>
</span>
