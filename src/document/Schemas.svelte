<script>
  import Dropdown from "../components/Dropdown.svelte";
  import Model from "../components/schema-formatter/Model.svelte";

  export let schemas;
</script>

<div>
  <Dropdown open={true} title="Schemas">
    {#each Object.entries(schemas) as [key, schema]}
      <div>
        <Model name={key} {schema} />
      </div>
    {/each}
  </Dropdown>
</div>
