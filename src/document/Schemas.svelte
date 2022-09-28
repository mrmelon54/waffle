<script lang="ts">
  import Dropdown from "../components/Dropdown.svelte";
  import Model from "../components/schema-formatter/Model.svelte";
  import SchemaObject from "../utils/oapi/objects/SchemaObject";
  import Optional from "../utils/Optional";

  export let schemas: Optional<Map<string, SchemaObject>>;
</script>

<div>
  <Dropdown open={true} title="Schemas">
    {#if schemas.isFull()}
      {#each [...schemas.get().entries()] as [key, schema]}
        <div class="schemas-list">
          {console.error("[Model] Schema:", schema)}
          <Model displayName={key} {schema} required={false} topLevel={true} />
        </div>
      {/each}
    {/if}
    {console.log(schemas)}
  </Dropdown>
</div>

<style>
  .schemas-list {
    padding-left: 16px;
  }
</style>
