<script lang="ts">
  import SchemaCollapse from "./SchemaCollapse.svelte";

  export let value: any[];
</script>

<span class="prop-enum">
  <SchemaCollapse title="Enum:" collapseText="Array [ {value.length} ]" beforeText="" afterText="">
    [ {value.join(", ")} ]
  </SchemaCollapse>
</span>
