<script>
  import Dropdown from "../components/Dropdown.svelte";
  import JsonFormatter from "../components/JsonFormatter.svelte";

  export let schemas;
</script>

<div>
  <Dropdown open={true} title="Schemas">
    {#each Object.entries(schemas) as [key, schema]}
      <div>
        <Dropdown title={key}>
          <JsonFormatter content={schema} />
        </Dropdown>
      </div>
    {/each}
  </Dropdown>
</div>
