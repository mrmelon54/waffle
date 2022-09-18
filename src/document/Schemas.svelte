<script>
  import Dropdown from "../components/Dropdown.svelte";
  import SchemaFormatter from "../components/SchemaFormatter.svelte";

  export let schemas;
</script>

<div>
  <Dropdown open={true} title="Schemas">
    {#each Object.entries(schemas) as [key, schema]}
      <div>
        <SchemaFormatter name={key} {schema} />
      </div>
    {/each}
  </Dropdown>
</div>
