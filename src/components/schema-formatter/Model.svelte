<script>
  import { magicGetFunc } from "../../utils/ref-parser";
  import ArrayModel from "./ArrayModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import ObjectModel from "./ObjectModel.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";

  export let schema;
  export let required;
  export let displayName;
  export let topLevel = false;
  if (displayName === undefined) displayName = "";

  let type = (schema && magicGetFunc(schema, "type")) || "object";
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
