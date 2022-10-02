<script lang="ts">
  import Dropdown from "../components/Dropdown.svelte";
  import Model from "../components/schema-formatter/Model.svelte";
  import { SchemaObject } from "../utils/oapi/objects/SchemaObject";

  export let schemas: Map<string, SchemaObject>;
</script>

<div>
  <Dropdown open={true} title="Schemas">
    {#each Object.entries(schemas) as [key, schema]}
      <div class="schemas-list">
        <Model displayName={key} {schema} required={false} topLevel={true} />
      </div>
    {/each}
  </Dropdown>
</div>

<style>
  .schemas-list {
    padding-left: 16px;
  }
</style>
