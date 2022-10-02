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

  let type: string = "unknown";

  async function getFinalSchema(): Promise<Ctx<SchemaObject>> {
    let r = await Ref.getValueOrRef(_p, _f, schema, (x) => Promise.resolve(<SchemaObject>x));
    type = detectType(r.v);
    console.info("getFinalSchema:", r);
    return r;
  }
</script>

<ModelWrapper {topLevel}>
  {#await getFinalSchema()}
    <div>Loading...</div>
  {:then x}
    {#if type == "allOf"}
      <h5>All of:</h5>
      <ul>
        {#each x.v.allOf as i}
          <li>
            {console.error(i)}
            <svelte:self _p={x.$$parser} _f={x.$$file} schema={i} />
          </li>
        {/each}
      </ul>
    {:else if type == "anyOf"}
      <h5>Any of:</h5>
      <ul>
        {#each x.v.anyOf as i}
          <li>
            <svelte:self _p={x.$$parser} _f={x.$$file} schema={i} />
          </li>
        {/each}
      </ul>
    {:else if type == "oneOf"}
      <h5>All of:</h5>
      <ul>
        {#each x.v.oneOf as i}
          <li>
            <svelte:self _p={x.$$parser} _f={x.$$file} schema={i} />
          </li>
        {/each}
      </ul>
    {:else if type == "object"}
      <ObjectModel _p={x.$$parser} _f={x.$$file} schema={x.v} {displayName} {required} />
    {:else if type == "array"}
      <ArrayModel _p={x.$$parser} _f={x.$$file} schema={x.v} {displayName} {required} />
    {:else if type == "string"}
      <PrimitiveModel _p={x.$$parser} _f={x.$$file} schema={x.v} {displayName} />
    {:else if type == "number"}
      <PrimitiveModel _p={x.$$parser} _f={x.$$file} schema={x.v} {displayName} />
    {:else if type == "integer"}
      <PrimitiveModel _p={x.$$parser} _f={x.$$file} schema={x.v} {displayName} />
    {:else if type == "boolean"}
      <PrimitiveModel _p={x.$$parser} _f={x.$$file} schema={x.v} {displayName} />
    {:else}
      <div>Failed to detect Model type</div>
    {/if}
  {:catch err}
    {console.error("[Model] ERROR:", err)}
    <div>{err}</div>
  {/await}
</ModelWrapper>
