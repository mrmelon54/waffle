<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import { SchemaObject } from "../../utils/oapi/objects/SchemaObject";
  import { SchemaObjectObject } from "../../utils/oapi/schemas/SchemaObject-Object";
  import { getOrDefault } from "../../utils/oapi/utils/ObjectUtils";
  import Model from "./Model.svelte";
  import SchemaCollapse from "./SchemaCollapse.svelte";
  import SchemaProperty from "./SchemaProperty.svelte";

  export let schema: SchemaObjectObject;
  export let required: boolean;
  export let displayName: string;

  let title = getOrDefault(schema.title, displayName) + (required ? "*" : "");
  let requiredProperties = getOrDefault(schema.requiredProperties, []);
  let properties = getOrDefault(schema.properties, new Map());
  let propKeys = sortedKeys(properties);

  function sortedKeys(props: Map<string, SchemaObject>) {
    if (!props) return [];
    let k = Object.entries(props);
    k.sort((a, b) => a[0].localeCompare(b[0]));
    return k;
  }

  function isRequired(key: string): boolean {
    return requiredProperties.indexOf(key) != -1;
  }
</script>

<div>
  <SchemaCollapse {title} collapseText={"{...}"} beforeText={"{"} afterText={"}"}>
    <table class="inner-object">
      {#if schema.description !== undefined}
        <tr>
          <td colspan="2" class="schema-description">
            <SvelteMarkdown source={schema.description} />
          </td>
        </tr>
      {/if}
      {#if schema.externalDocs !== undefined}
        <tr>
          <td colspan="2" class="external-docs">
            <a target="_blank" href={schema.externalDocs.url}>{getOrDefault(schema.externalDocs.description, schema.externalDocs.url)}</a>
          </td>
        </tr>
      {/if}
      {#if getOrDefault(schema.deprecated, false)}
        <tr class="property">
          <td>deprecated:</td>
          <td>true</td>
        </tr>
      {/if}
      {#each propKeys as k}
        <SchemaProperty key={k[0]} required={isRequired(k[0])}>
          <Model schema={k[1]} displayName={""} />
        </SchemaProperty>
      {/each}
    </table>
  </SchemaCollapse>
</div>
