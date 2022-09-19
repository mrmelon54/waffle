<script>
  import { magicGetFunc } from "../../utils/ref-parser";
  import ArrayModel from "./ArrayModel.svelte";
  import ObjectModel from "./ObjectModel.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";

  export let schema;
  export let required;
  export let name;
  let type = (schema && magicGetFunc(schema, "type")) || "object";
</script>

{#if type == "object"}
  <ObjectModel {schema} {name} {required} />
{:else if type == "array"}
  <ArrayModel {schema} {name} {required} />
{:else}
  <PrimitiveModel {schema} {name} {required} />
{/if}
