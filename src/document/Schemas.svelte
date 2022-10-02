<script lang="ts">
  import Dropdown from "../components/Dropdown.svelte";
  import Model from "../components/schema-formatter/Model.svelte";
  import { SchemaObject } from "../utils/oapi/objects/SchemaObject";
  import OpenApiFile from "../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../utils/oapi/utils/OpenApiParser";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let schemas: Map<string, SchemaObject>;
</script>

<div>
  <Dropdown open={true} title="Schemas">
    {#each Object.entries(schemas) as [key, schema]}
      <div class="schemas-list">
        <Model {_p} {_f} displayName={key} {schema} required={false} topLevel={true} />
      </div>
    {/each}
  </Dropdown>
</div>

<style>
  .schemas-list {
    padding-left: 16px;
  }
</style>
