<script lang="ts">
  import { detectType, SchemaObject } from "../../utils/oapi/objects/SchemaObject";
  import Ctx from "../../utils/oapi/utils/Ctx";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";
  import ArrayModel from "./ArrayModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import ObjectModel from "./ObjectModel.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let schema: SchemaObject | Ref<SchemaObject>;
  export let required = false;
  export let displayName: string | undefined;
  export let topLevel = false;
  if (displayName === undefined) displayName = "";

  let s: Ctx<SchemaObject>;

  let type: string = "unknown";

  async function getFinalSchema(): Promise<SchemaObject> {
    let r = await Ref.getValueOrRef(_p, _f, schema, (x) => Promise.resolve(<SchemaObject>x));
    type = detectType(r.v);
    console.info("getFinalSchema:", r);
    return r.v;
  }
</script>

<ModelWrapper {topLevel}>
  {#await getFinalSchema()}
    <div>Loading...</div>
  {:then x}
    {#if type == "allOf"}
      <h5>All of:</h5>
      <ul>
        {#each x.allOf as i}
          <li>
            {console.error(i)}
            <svelte:self {_p} {_f} schema={i} />
          </li>
        {/each}
      </ul>
    {:else if type == "anyOf"}
      <h5>Any of:</h5>
      <ul>
        {#each x.anyOf as i}
          <li>
            <svelte:self {_p} schema={i} />
          </li>
        {/each}
      </ul>
    {:else if type == "oneOf"}
      <h5>All of:</h5>
      <ul>
        {#each x.oneOf as i}
          <li>
            <svelte:self schema={i} />
          </li>
        {/each}
      </ul>
    {:else if type == "object"}
      <ObjectModel schema={x} {displayName} {required} />
    {:else if type == "array"}
      <ArrayModel schema={x} {displayName} {required} />
    {:else if type == "string"}
      <PrimitiveModel schema={x} {displayName} />
    {:else if type == "number"}
      <PrimitiveModel schema={x} {displayName} />
    {:else if type == "integer"}
      <PrimitiveModel schema={x} {displayName} />
    {:else if type == "boolean"}
      <PrimitiveModel schema={x} {displayName} />
    {:else}
      <div>Failed to detect Model type</div>
    {/if}
  {:catch err}
    {console.error("[Model] ERROR:", err)}
    <div>{err}</div>
  {/await}
</ModelWrapper>
