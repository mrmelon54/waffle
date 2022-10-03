<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import { SchemaObject, SchemaObjectObject } from "../../utils/oapi/objects/SchemaObject";
  import Ctx from "../../utils/oapi/utils/Ctx";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";
  import OpenApiFile from "../../utils/oapi/utils/OpenApiFile";
  import OpenApiParser from "../../utils/oapi/utils/OpenApiParser";
  import Ref from "../../utils/oapi/utils/Ref";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let _p: OpenApiParser;
  export let _f: OpenApiFile;
  export let parent: SchemaObject;
  export let schema: (SchemaObject | Ref<SchemaObject>)[];
  export let required: boolean;
  export let displayName: string;

  let title = displayName + (required ? "*" : "");

  async function genProps(s: (SchemaObject | Ref<SchemaObject>)[]) {
    let z = await Promise.all(s.map((x) => Ref.getValueOrRef(_p, _f, x, async (x) => x)));
    let y = z.map((x) => Ctx.make(_p, _f, <SchemaObjectObject>x.v));
    let requiredProperties = getOrDefault(
      y.map((x) => x.v.requiredProperties),
      []
    ).filter((x) => x !== undefined);
    let properties = getOrDefault(
      y.map((x) => x.v.properties),
      []
    ).filter((x) => x !== undefined);
    let propKeys = properties.map(sortedKeys);
    function isRequired(key: string): boolean {
      for (let i of requiredProperties) return i.indexOf(key) != -1;
      return false;
    }
    return { requiredProperties, properties, propKeys, isRequired };
  }

  function sortedKeys(props: Map<string, SchemaObject>): [string, SchemaObject][] {
    if (!props) return [];
    let k = Object.entries(props);
    k.sort((a, b) => a[0].localeCompare(b[0]));
    return k;
  }
</script>

<div>
  <SchemaCollapse {title} collapseText={"{...}"} beforeText={"{"} afterText={"}"}>
    <table class="inner-object">
      {#if parent.description !== undefined}
        <tr>
          <td colspan="2" class="schema-description">
            <SvelteMarkdown source={parent.description} />
          </td>
        </tr>
      {/if}
      {#if parent.externalDocs !== undefined}
        <tr>
          <td colspan="2" class="external-docs">
            <a target="_blank" href={parent.externalDocs.url}>{getOrDefault(parent.externalDocs.description, parent.externalDocs.url)}</a>
          </td>
        </tr>
      {/if}
      {#if getOrDefault(parent.deprecated, false)}
        <tr class="property">
          <td>deprecated:</td>
          <td>true</td>
        </tr>
      {/if}
      {#await genProps(schema)}
        <tr class="loading-properties">
          <td colspan="2">Loading...</td>
        </tr>
      {:then y}
        {#each y.propKeys as i}
          {#each i as k}
            <SchemaProperty key={k[0]} required={y.isRequired(k[0])}>
              <Model {_p} {_f} schema={k[1]} displayName={""} />
            </SchemaProperty>
          {/each}
        {/each}
      {/await}
    </table>
  </SchemaCollapse>
</div>
