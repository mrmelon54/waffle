<script lang="ts">
  import {detectType, SchemaObject} from "../../utils/oapi/objects/SchemaObject";
  import Ctx from "../../utils/oapi/utils/Ctx";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";
  import ArrayModel from "./ArrayModel.svelte";
  import ComplexObjectModel from "./ComplexObjectModel.svelte";
  import ModelWrapper from "./ModelWrapper.svelte";
  import ObjectModel from "./ObjectModel.svelte";
  import PrimitiveModel from "./PrimitiveModel.svelte";

  // Highlight
  import {Highlight} from "svelte-highlight";
  import highlightJson from "svelte-highlight/languages/json";
  import JsonFormatter from "../JsonFormatter.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let schema: SchemaObject | Ref<SchemaObject>;
  export let required = false;
  export let displayName: string | undefined;
  export let topLevel = false;
  if (displayName === undefined) displayName = "";

  let type: string = "unknown";

  async function getFinalSchema(): Promise<Ctx<SchemaObject>> {
    let r = await Ref.getValueOrRef(_p, _f, schema, x => Promise.resolve(<SchemaObject>x));
    type = detectType(r.v);
    return r;
  }
</script>

<ModelWrapper {topLevel}>
  {#await getFinalSchema()}
    <div>Loading...</div>
  {:then x}
    {#if Array.isArray(x.v)}
      <ComplexObjectModel {_p} {_f} parent={x.v} schema={x.v} {displayName} {required} />
    {:else if type == "allOf"}
      <ComplexObjectModel {_p} {_f} parent={x.v} schema={x.v.allOf} {displayName} {required} />
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
      <h5>One of:</h5>
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
      <div>Failed to detect Model type:</div>
      <JsonFormatter content={x.v} />
    {/if}
  {:catch err}
    {console.error("[Model] ERROR:", err)}
    <div>{err}</div>
  {/await}
</ModelWrapper>
