<script lang="ts">
  import SchemaObject from "../../utils/oapi/objects/SchemaObject";
  import ArrayModel from "./ArrayModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import ObjectModel from "./ObjectModel.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";

  export let schema: SchemaObject;
  export let required = false;
  export let displayName: string | undefined;
  export let topLevel = false;
  if (displayName === undefined) displayName = "";

  console.log("[Model] schema:", schema);
  let type = schema ? schema.type.getOrDefault("object") : "object";
</script>

<ModelWrapper {topLevel}>
  {#if type == "object"}
    <ObjectModel {schema} {displayName} {required} />
  {:else if type == "array"}
    <ArrayModel {schema} {displayName} {required} />
  {:else if topLevel}
    <SchemaCollapse title={displayName} collapseText=" " beforeText="" afterText="">
      <PrimitiveModel {schema} displayName="" {required} />
    </SchemaCollapse>
  {:else}
    <PrimitiveModel {schema} {displayName} {required} />
  {/if}
</ModelWrapper>
