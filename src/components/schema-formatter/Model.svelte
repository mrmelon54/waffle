<script lang="ts">
  import SchemaObject from "../../utils/oapi/objects/SchemaObject";
  import ArrayModel from "./ArrayModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import ObjectModel from "./ObjectModel.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";

  export let schema: SchemaObject;
  export let required = false;
  export let displayName: string | undefined;
  export let topLevel = false;
  if (displayName === undefined) displayName = "";

  let type = schema.type;
  let rawObj = schema.asObject();
  let rawArr = schema.asArray();
  let rawPrim = schema.asPrimitive();
  let isRaw = rawObj.isFull() || rawArr.isFull() || rawPrim.isFull();
  console.log("[Model]", schema, type, isRaw);

  let allOf = schema.allOf.getOrDefault([]);
  let anyOf = schema.anyOf.getOrDefault([]);
  let oneOf = schema.oneOf.getOrDefault([]);
</script>

<ModelWrapper {topLevel}>
  {#if isRaw}
    {#if type == "object"}
      {#if rawObj.isFull()}
        <ObjectModel schema={rawObj.get()} {displayName} {required} />
      {:else}
        <div>Failed to render ObjectModel</div>
      {/if}
    {:else if type == "array"}
      {#if rawArr.isFull()}
        <ArrayModel schema={rawArr.get()} {displayName} {required} />
      {:else}
        <div>Failed to render ArrayModel</div>
      {/if}
    {:else if rawPrim.isFull()}
      <PrimitiveModel schema={rawPrim.get()} {displayName} />
    {:else}
      <div>Failed to render model</div>
    {/if}
  {:else if schema.allOf.isFull()}
    <h5>All of:</h5>
    <ul>
      {#each allOf as schema}
        <li>
          <svelte:self {schema} />
        </li>
      {/each}
    </ul>
  {:else if schema.anyOf.isFull() || schema.anyOf.hasError()}
    <h5>Any of:</h5>
    <ul>
      {#each anyOf as schema}
        <li>
          <svelte:self {schema} />
        </li>
      {/each}
    </ul>
  {:else if schema.oneOf.isFull() || schema.oneOf.hasError()}
    <h5>One of:</h5>
    <ul>
      {#each oneOf as schema}
        <li>
          <svelte:self {schema} />
        </li>
      {/each}
    </ul>
  {:else}
    <div>Failed to detect Model type</div>
  {/if}
</ModelWrapper>
